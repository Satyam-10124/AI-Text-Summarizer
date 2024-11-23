async function querySummarization(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        // Check if response is OK
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => null); // Handle invalid JSON gracefully
            throw new Error(
                `Error ${response.status}: ${
                    errorDetails?.error || "Unexpected error from the server"
                }`
            );
        }

        // Return JSON response
        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        throw error; // Re-throw the error for further handling
    }
}

document.getElementById("summarize-btn").addEventListener("click", async () => {
    const inputText = document.getElementById("input-text").value.trim();

    // User input validation
    if (!inputText) {
        showToast("Please enter some text to summarize.", "error");
        return;
    }

    if (inputText.length > 2000) {
        showToast(
            "Input too long. Please reduce it to 2000 characters.",
            "error"
        );
        return;
    }

    const summaryOutput = document.getElementById("summary-output");
    summaryOutput.innerHTML = "Loading summary...";

    try {
        // Call API to summarize text
        const result = await querySummarization({ inputs: inputText });

        if (result && result[0] && result[0].summary_text) {
            summaryOutput.innerHTML = result[0].summary_text;
        } else {
            throw new Error(
                "The API did not return a valid summary. Please try again later."
            );
        }
    } catch (error) {
        // Display error to the user
        summaryOutput.innerHTML =
            "Sorry, an error occurred. Please try again later.";
        showToast(
            `Error: ${error.message}. Check console for more details.`,
            "error"
        );
    }
});

// Utility function to show Toastify notifications
function showToast(message, type = "info") {
    const colors = {
        info: "linear-gradient(to right, #56CCF2, #2F80ED)",
        success: "linear-gradient(to right, #6EDC90, #28A745)",
        error: "linear-gradient(to right, #F2994A, #EB5757)",
    };

    Toastify({
        text: message,
        backgroundColor: colors[type] || colors.info,
        duration: 4000,
        gravity: "top", // Display toast on top
        position: "center", // Centered horizontally
    }).showToast();
}
