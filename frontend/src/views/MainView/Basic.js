import React, { Component } from "react";
import Pdf from "../../services/pdfFactory.js";
import About from "../About/About.js";
import OrderForm from "../OrderForm/OrderForm.js";
import FileUploader from "./FileUploader.js";
import { convertCanvasToImage, convertToGif } from "../../services/imageUtils.js";
import { generatePdf } from "./pdfUtils";
import { 
  validateNameLength,
  validateNameContent,
  validatePdfForUpload } from './validate';
import "./Basic.css";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

class Basic extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      gifVideo: "",
      images:[],
      loadingProgress: 0,
      madeBy: ""
    };
  }

  //arrow fn so I don't have to bind to 'this'
  updateName = evt => {
    // name for cover of flipbook
    let name = String(evt.target.value);
    this.setState({ madeBy: name });
  };
  updateView = view => {
    // ghetto router
    this.setState({ view });
  };

  // drop an .mp4 in, add mp4 and gif to state
  onDrop(files) {
    this.setState({
      files
    });
    this.addGifToState(files);
    console.log("files", files);
  }

  //gets progress from converter out and sends to state here, where it can get turned into the svg progress bar
  updateLoadingBar = loadingProgress => {
    console.log("loading", loadingProgress);
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

  render() {
    const widthOfProgressBar = 500 * this.state.loadingProgress;
    return (
      <div>
          <div>
            {!this.state.gifVideo ? (
              <h3 className="description">
                Convert your instagram story into a flipbook. In case that's
                something you've always wanted to do.
              </h3>
            ) : (
              <h3 className="gifTitle">
                Here's what your flipbook will look like!
              </h3>
            )}
            <section className="appBody">
              {!this.state.gifVideo &&
                !this.state.loadingProgress > 0 && (
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
                    <FileUploader disabled= {validateNameLength(this.state.madeBy)} onDrop={this.onDrop.bind(this)} />
                  </div>
                )}
              {this.state.loadingProgress > 0 &&
                !this.state.gifVideo && (
                  <div className="loadingBar">
                    <svg height="10">
                      <rect
                        width={widthOfProgressBar * 7 / 10}
                        height="10"
                        fill="orange"
                        fillOpacity="0.5"
                        strokeOpacity="0.8"
                      />
                    </svg>
                    <h3>Converting...</h3>
                  </div>
                )}
              {this.state.gifVideo && (
                <div className="gifDisplay">
                  <img
                    className="gifElement"
                    src={this.state.gifVideo}
                    alt="gif"
                  />
                  <div className="centerColumn">
                    You can either download the PDF, and email it to yourself or
                    save to Drive or dropbox to print yourself, or order a
                    professionally printed and bound version for 20 euro.
                  </div>
                  <div className="pdfButton" onClick={()=>generatePdf(this.state.images, 'A4', this.state.madeBy)}>
                    Download PDF (A4)
                  </div>
                  <div
                    className="pdfButton centerColumn"
                    onClick={() => {
                      generatePdf(this.state.images, 'A7', this.state.madeBy);
                      // history.push('/new-location');
                    }}
                  >
                    Order flipbook
                  </div>
                </div>
              )}
              <Link to="/about/">About this project</Link>
            </section>
          </div>
      </div>
    );
  }
}

export default Basic;

// {this.state.view === "order" && (
//   <OrderForm changePage={this.updateView} pdf={Pdf.convertToBlob()} name={this.state.madeBy} />
// )}