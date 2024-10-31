import React, { useRef, useState } from "react";

const PDFReader = ({ fileUrl }) => {
  const viewerRef = useRef(null);
  const [pdfViewer, setPdfViewer] = useState(null);

  // Dynamically import PDF.js only when component mounts
  React.useEffect(() => {
    const loadPdfViewer = async () => {
      try {
        // Import PDF.js dynamically
        const pdfjsLib = await import("pdfjs-dist");

        // Set worker source - using CDN for reliability
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        // Get the first page
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        // Prepare canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        if (viewerRef.current) {
          viewerRef.current.innerHTML = "";
          viewerRef.current.appendChild(canvas);
        }

        const renderTask = page.render(renderContext);
        await renderTask.promise;

        setPdfViewer({ pdf, currentPage: 1 });
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdfViewer();
  }, [fileUrl]);

  // Function to handle page navigation
  const changePage = async (delta) => {
    if (!pdfViewer) return;

    const newPage = pdfViewer.currentPage + delta;
    if (newPage < 1 || newPage > pdfViewer.pdf.numPages) return;

    try {
      const page = await pdfViewer.pdf.getPage(newPage);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = viewerRef.current.querySelector("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      setPdfViewer({ ...pdfViewer, currentPage: newPage });
    } catch (error) {
      console.error("Error changing page:", error);
    }
  };

  // Toggle full screen
  const toggleFullScreen = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => changePage(-1)}
          disabled={!pdfViewer || pdfViewer.currentPage <= 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {pdfViewer && (
          <span className="py-2">
            Page {pdfViewer.currentPage} of {pdfViewer.pdf.numPages}
          </span>
        )}
        <button
          onClick={() => changePage(1)}
          disabled={
            !pdfViewer || pdfViewer.currentPage >= pdfViewer?.pdf?.numPages
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={toggleFullScreen}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Full Screen
        </button>
      </div>
      <div
        ref={viewerRef}
        className="border rounded-lg overflow-auto bg-gray-100 flex justify-center items-center"
        style={{ height: "750px" }}
      />
    </div>
  );
};

export default PDFReader;
