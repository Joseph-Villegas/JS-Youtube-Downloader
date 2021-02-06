const downloadForm = document.getElementById("download");
downloadForm.addEventListener("submit", async event => {
    // Keep form data from reaching server before being validated
    event.preventDefault();

    const url = document.getElementById("url").value.trim();

    // Validate input length
    if (!url.length) { console.log("Empty URL Field"); return; }

    const fileType = document.getElementById("file_type").value;
    const endpoint = fileType == "mp3" ? `/download/mp3?url=${String(url)}` : `/download/mp4?url=${String(url)}`;
    window.location.href = endpoint;
});
