import React, { Component } from "react";
import FileUploader from "./FileUploader.js";
import { convertCanvasToImage, convertToGif } from "../../services/imageUtils.js";
import { validateNameLength } from './validate';
import "./Basic.css";
import { Link } from "react-router-dom";
import { generatePdf } from "./pdfUtils";
import OrderForm from "../OrderForm/OrderForm.js";
import { postUpload } from '../../services/Checkout';
import Loader from 'react-loader-spinner';


class Basic extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      gifVideo: "",
      images:[],
      loadingProgress: 0,
      madeBy: "",
      orderId: "",
      generatingPdf: 0,
    };
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

  turnOnSpinner = (pageNr) => {
    console.log('did the thing', pageNr)
    this.setState({
      generatingPdf: pageNr,
    });
  }

  generateDataForOrder = () => {
    const orderId = this.state.madeBy + Date.now();
    console.log("orderId", orderId);
    this.setState({
        orderId,
      });
    generatePdf(this.state.images, 'A7', this.state.madeBy, this.turnOnSpinner).then((pdf)=>{
      postUpload(orderId, pdf);
    }).then((res)=>{
      console.log("done", res);
      this.setState({
        generatingPdf: 0,
      });
    });
  }

  generateDataForDownload = () => {
    generatePdf(this.state.images, 'A4', this.state.madeBy, this.turnOnSpinner).then(()=>{
      this.setState({
        generatingPdf: 0,
      });
      console.log("done");
    });
  }

  render() {
    const showIntro = !this.state.gifVideo && this.state.loadingProgress === 0;
    const showLoadingBar = 0 < this.state.loadingProgress && !this.state.gifVideo;
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
              <div className="centerColumn">
                You can either download the PDF, and email it to yourself or
                save to Drive or dropbox to print yourself, or order a
                professionally printed and bound version for 20 euro.
              </div>
              <div className="pdfButton" onClick={this.generateDataForDownload}>
                Download PDF (A4)
              </div>
              <div className="pdfButton" onClick={this.generateDataForOrder} >
                Order flipbook (A7)
              </div>
            </div>
          )}

          {/* generate the pdf */}
          {this.state.generatingPdf > 0 && (
            <div>
              <Loader type="TailSpin" color="black" height={80} width={80} />
              <h3>Converting to the size you chose...</h3>
            </div>
          )}

          {/* pay for the book */}
          {showPaymentButton && (
            <div>
              <OrderForm pdf={this.state.pdf} madeBy={this.state.madeBy} orderId={this.state.orderId} />
            </div>
          )}

        </section>
        <Link to="/about/">About this project</Link>
      </div>
    );
  }
}

export default Basic;
