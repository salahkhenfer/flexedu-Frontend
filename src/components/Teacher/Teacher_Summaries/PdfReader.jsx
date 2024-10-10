import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create an instance of the default layout plugin with custom toolbar
const PDFReader = ({ fileUrl }) => {
  // Customize the default layout plugin to hide the download button
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (toolbarSlot) => (
      <div style={{ display: "flex" }}>
        {toolbarSlot.searchPopover}
        {toolbarSlot.previousPageButton}
        {toolbarSlot.currentPageInput}
        {toolbarSlot.nextPageButton}
        {toolbarSlot.zoomOutButton}
        {toolbarSlot.zoomPopover}
        {toolbarSlot.zoomInButton}
        {/* Omit the download button */}
        {/* {toolbarSlot.downloadButton} */}
      </div>
    ),
  });

  return (
    <div style={{ height: "750px" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PDFReader;
