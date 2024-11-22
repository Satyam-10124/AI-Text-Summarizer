// Function to query Hugging Face API for text summarization
async function querySummarization(data) {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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", // Replace with your actual token
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

// Function to handle text summarization
document.getElementById("summarize-btn").addEventListener("click", async () => {
  const inputText = document.getElementById("input-text").value;

  if (!inputText.trim()) {
    Toastify({
      text: "Please enter some text to summarize.",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      className: "info",
      duration: 3000
    }).showToast();
    return;
  }

  // Show loading message while waiting for the API response
  const summaryOutput = document.getElementById("summary-output");
  summaryOutput.innerHTML = "<p>Loading summary...</p>";

  // Call Hugging Face API for text summarization
  const result = await querySummarization({ inputs: inputText });

  // Display the result
  if (result && result[0] && result[0].summary_text) {
    summaryOutput.innerHTML = `<p>${result[0].summary_text}</p>`;
  } else {
    summaryOutput.innerHTML = "<p>Sorry, an error occurred. Please try again later.</p>";
  }
});
