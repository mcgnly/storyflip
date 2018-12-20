import React, { Component } from "react";
import FileUploader from "./FileUploader.js";
import { convertCanvasToImage, convertToGif } from "../../services/imageUtils.js";
import { validateNameLength } from './validate';
import "./Basic.css";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import PdfMade from './PdfMade';

const getInitialState = () => (
  {
    files: [],
    gifVideo: "",
    images:[],
    loadingProgress: 0,
    madeBy: "",
    orderId: "",
    generatingPdf: 0,
    size: "",
  }
);


class Basic extends Component {
  constructor() {
    super();
    this.state = getInitialState();
  }

  flushState() {
    this.setState(getInitialState());
  }

  //arrow fn so I don't have to bind to 'this'
  updateName = evt => {
    // name for cover of flipbook
    let name = String(evt.target.value);
    this.setState({ madeBy: name });
  };

  // drop an .mp4 in, add mp4 and gif to state
  onDrop(files) {
    this.setState({
      files
    });
    this.addGifToState(files);
  }

  //gets progress from converter out and sends to state here, where it can get turned into the svg progress bar
  updateLoadingBar = loadingProgress => {
    this.setState({
      loadingProgress
    });
  };

  convertGifToStillFrames(obj) {
    //now convert the canvases from the gif to images
    return obj.savedRenderingContexts.map((item, index) => {
      //this returns an array of promises, because each conversion takes a while
      return convertCanvasToImage(item, index).then(image => {
        // add the image to an array, from which we can generate the pdf later
        this.setState({
          images: this.state.images.concat(image)
        });
      });
    });
  }

  addGifToState(files) {
    // this returns an object which has the gif itself and the array of canvas-type frames
    convertToGif(files, this.updateLoadingBar).then(obj => {
      // add the gif to the state to display it
      this.setState({
        gifVideo: obj.image
      });
      
      const promiseArray = this.convertGifToStillFrames(obj);
      return promiseArray;
    });
  }

  turnOnSpinner = () => {
    return new Promise(
      (resolve, reject) => {
        console.log('turning on spinner')
        this.setState({
          generatingPdf: 7,
        });
        resolve();
      }
    );
  }



  render() {
    const showIntro = !this.state.gifVideo && this.state.loadingProgress === 0;
    const showLoadingBar = 0 < this.state.loadingProgress && !this.state.gifVideo;
    const showSizeButton = this.state.gifVideo && this.state.generatingPdf === 0;
    const showPaymentButton = this.state.orderId && this.state.generatingPdf === 0;
    
    return (
      <div>
        <h3 className="description">
          Convert your instagram story into a flipbook. In case that's
          something you've always wanted to do.
        </h3>
        <section className="appBody">

          {/* before video upload */}
          {showIntro && (
            <div>
              <div className="madeBy">
                Made By:
                <input
                  type="text"
                  className="nameInput"
                  onChange={this.updateName}
                  maxLength="15"
                />
                {
                  validateNameLength(this.state.madeBy) ?
                  <h3 className="errorMsg">
                    You have reached the maximum length for the title page!
                  </h3> :
                  null
                }
              </div>
              <FileUploader disabled={validateNameLength(this.state.madeBy)} onDrop={this.onDrop.bind(this)} />
            </div>
          )}

          {/* during video upload */}
          {showLoadingBar && (
            <div className="loadingBar">
              <Loader type="TailSpin" color="black" height={80} width={80} />
              <h3>Converting your video to images...</h3>
            </div>
          )}
            
          {/* after video upload, choose a format */}
          {this.state.gifVideo && (
            <div>
              <h3 className="gifTitle">
                Here's what your flipbook will look like!
              </h3>
              <div className="gifDisplay">
                <img
                  className="gifElement"
                  src={this.state.gifVideo}
                  alt="gif"
                />
              </div>
            </div>
          )}
          {showSizeButton && (
            <div>
              <div className="centerColumn">
                You can either download the PDF, and email it to yourself or
                save to Drive or dropbox to print yourself, or order a
                professionally printed and bound version for 20 euro.
                It will take some time to convert to your chosen size, be patient!
              </div>
              <div className="pdfButton" onClick={()=>{this.setState({
                  generatingPdf: 1,
                  size: 'A4',
                })}}>
                Download PDF (A4)
              </div>
              <div className="pdfButton" onClick={()=>{this.setState({
                generatingPdf: 1,
                size: 'A7',
                })}} >
                Order flipbook (A7)
              </div>
            </div>
          )}

          {/* generate the pdf */}
          {this.state.generatingPdf > 0 && (
              <PdfMade images={this.state.images} madeBy={this.state.madeBy} size={this.state.size} flushState={this.flushState}/>
          )}

        </section>
        <Link to="/about/">About this project</Link>
      </div>
    );
  }
}

export default Basic;
