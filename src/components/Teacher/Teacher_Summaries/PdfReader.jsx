import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Swal from "sweetalert2";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ fileLink }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Disable right-click
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            Swal.fire(
                "Security Alert",
                "Right-click disabled for security!",
                "warning"
            );
        };

        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-viewer">
            <Document
                file={fileLink}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-document"
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div className="pdf-controls">
                <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {numPages}
                </span>
                <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PDFReader;
