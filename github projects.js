let search=document.querySelector("#search");
let template=document.queryCommandValue("#template");
//keyboard search
search.addEventListener("keyup",(e)=>
{
    let searchText=e.target.value;
    SerachGithubProfile("searchText");
});
/---------searchbyvoice----/
let SpeechByVoice=document.querySelector("#searchIcon");
SearchByVoice.addEventListener("#click",(e)=>
{
    windows.SpeechRecognition=windows.SpeechRecognition||windows.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.interimResults = true;
  
    recognition.addEventListener("result", (e) => {
      let transcript = [...e.results]
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")
        .replace(/\s/g, "");
  
      search.value = transcript;
      let seachText=transcript;
      SearchGitHubProfiles(searchText);
    });

  
});  
 recognition.start();

/-----github api ------/

function SearchGitHubProfiles(searchText) {
  let Client_Id = "f90b13159439701ec649";
  let Client_Secret = "56e950fe9d83621f90c520df8e930b1a83bfcebf";
  let BASE_URL = `https://api.github.com/users/${searchText}?client_id=${Client_Id}&client_secret=${Client_Secret}`;
  //basic github auth

  window
    .fetch(BASE_URL)
    .then((data) => {
      //ReadableStream
      data
        .json()
        .then((users) => {
          if (users.message === "Not Found") {
            template.innerHTML = `<h1 style="color:red">No Github Profile Found</h1>`;
          } else {
            let output = "";
            output += `
              <section id="ProfileBlock">
                <article>
                  <div class="leftBlock">
                     <figure>
                      <img src="${users.avatar_url}" alt="${users.login}" />
                     </figure>
                     <h4>${users.name}</h4>
                     <h5>${users.login}</h5>
                     <h5>${users.bio}</h5>
                   
                     <h5>${users.company}</h5>
                     <h5>${users.location}</h5>
                  </div>
                  <div class="rightBlock">
                    <h1>right Block</h1>
                  </div>
                </article>
              </section>
            `;
            template.innerHTML = output;
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
