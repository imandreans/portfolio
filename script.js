const container = document.getElementById("projects");
const typeBtn = document.querySelectorAll("input[type=radio]");
console.log(container);
fetch("./projects.json")
  .then((request) => {
    if (!request.ok) {
      console.log(`response status: ${request.status}`);
    }
    return request.json();
  })
  .then((data) => {
    typeBtn.forEach((type) => {
      type.addEventListener("change", filterItems);
    });
    //function to filter projects
    function filterItems(e) {
      // get radio button value
      const selectedType = e.target.value;
      //this is the data that gonna be displayed
      const filteredData =
        // if the type is 'All', display all
        selectedType === "All"
          ? data
          : // if it's another type, filter the projects based on the type
            data.filter((project) => project.type === selectedType);
      displayItems(filteredData);
    }
    //initial data
    displayItems(data);
  });

// disable the link button if link doesnt exist

function displayItems(items) {
  // assign empty container
  container.innerHTML = "";
  // looping through items to display the HTML template of projects
  items.forEach((item) => {
    //create LI element with class project
    const project = document.createElement("li");
    project.className = "project";
    // element with class project contains HTML below
    const isVideoExist = item.video.length == 0 ? "none" : "inline";
    const isGithubExist = item.github.length == 0 ? "none" : "inline";
    const isArticleExist = item.article.length == 0 ? "none" : "inline";
    project.innerHTML = `<h1>${item.name}</h1>
      <div>
        <a style='display: ${isGithubExist}' href="${item.github}" target="_blank" rel="noopener noreferrer"> <h2>Github</h2></a>
        <a style='display: ${isVideoExist}' href="${item.video}"  rel="noopener noreferrer"> <h2 >Video</h2></a>
        <a style='display: ${isArticleExist}' href="${item.article}"  rel="noopener noreferrer"> <h2>Article</h2></a>
      </div>`;
    // Append project to container
    container.appendChild(project);
  });
}
