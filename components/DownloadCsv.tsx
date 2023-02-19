import { Button } from "@chakra-ui/react";

export default function DownloadCsv({ userData, disabled = false }) {
    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType });
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    const exportToCsv = (e) => {
        e.preventDefault();
        const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
        const header = Object.keys(userData[0]);
        let csv = userData.map((row) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join(",")
        );
        csv.unshift(header.join(","));
        csv = csv.join("\r");
        downloadFile({
            data: csv,
            fileName: "users.csv",
            fileType: "text/csv",
        });
    };
    return (
        <Button
            disabled={disabled}
            onClick={exportToCsv}
            colorScheme="teal"
            variant="outline"
            size="lg"
            mt={2}
        >
            Download CSV
        </Button>
    );
}
