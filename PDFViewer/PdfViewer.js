import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import record1 from '../../assets/RetmarkerDemo1.pdf';

 
export default class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <Document
          file="../../assets/RetmarkerDemo1.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}