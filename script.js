// Function to query Hugging Face API for text summarization using distilbart-cnn-12-6 model
async function querySummarization(data) {
  const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
          method: "POST",
          headers: {
              Authorization: "Bearer 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", // Replace with your actual token
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      }
  );
  return await response.json();
}

// Event Listener for Summarize Button
document.getElementById("summarize-btn").addEventListener("click", async () => {
  const inputText = document.getElementById("input-text").value;

  // Show error notification if input is empty
  if (!inputText.trim()) {
      Toastify({
          text: "Please enter some text to summarize.",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000
      }).showToast();
      return;
  }

  // Display loading message
  const summaryOutput = document.getElementById("summary-output");
  summaryOutput.innerHTML = "Loading summary...";

  // Fetch summarization result
  const result = await querySummarization({ inputs: inputText });

  // Display summary or error message
  if (result && result[0] && result[0].summary_text) {
      summaryOutput.innerHTML = result[0].summary_text;
  } else {
      summaryOutput.innerHTML = "Sorry, an error occurred. Please try again later.";
  }
});