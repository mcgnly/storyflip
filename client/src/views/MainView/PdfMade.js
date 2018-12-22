import React from "react";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import { pdfBySize } from "./pdfUtils";
import OrderForm from "../OrderForm/OrderForm.js";

class PdfMade extends React.Component {
    constructor() {
        // props images, size, and madeBy
        super();
        this.state = {
            spinnerOn: true,
            orderId: "",
            pdf: null,
        };
      }

    componentDidMount() {
        if (this.props.size === 'A4'){
            this.generateDataForDownload();
        } else {
            this.generateDataForOrder();
        }
    }
    
    generateDataForOrder = () => {
        const {images, size, madeBy} = this.props;
      const orderId = madeBy + Date.now();

      pdfBySize(images, size, madeBy).then((pdf)=>{
          this.setState({
            spinnerOn: false,
            pdf,
            orderId,
        });
      });
    }
    
    generateDataForDownload = () => {
        const {images, size, madeBy} = this.props;
        pdfBySize(images, size, madeBy).then((pdf)=>{
            console.log("pdf", pdf, pdf.size)
            this.setState({
                spinnerOn: false,
            });
        });
    }
    
    render() {
        const { spinnerOn, orderId } = this.state;
        const showOrderForm = !spinnerOn && orderId
      return (
            <div>
                { this.state.spinnerOn && (
                <div>
                    <Loader type="TailSpin" color="black" height={80} width={80} />
                    <h3>Converting to the size you chose...</h3>
                    <button onClick={this.generateDataForDownload}>make it for real</button>
                </div>)
                }
                { showOrderForm && (
                <div>
                    <OrderForm pdf={this.state.pdf} madeBy={this.props.madeBy} orderId={this.state.orderId} flushState={this.props.flushState} />
                </div>)
                }
            </div>
        );
    }
  }


export default PdfMade;


