
//get started button clik handle

document.getElementById('start-button').addEventListener('click', (e) => {
    e.preventDefault();

    const userName = e.target.parentNode.childNodes[1].value;
    const password = (e.target.parentNode.childNodes[3].value);
    
    if (!userName) {
        alert("Please Tell use your name first");
       
    } else if(password !=="123456"){
        alert("Wrong Password, Please valid password input")
        
    } else {
        document.getElementById('navbar-hidden').style.display = "block";
        document.getElementById('learn-section').style.display = "block";
        document.getElementById('accrodian-section').style.display = "block";

        //sweet alart here

        Swal.fire({
        title: "অভিনন্দন !",
        text: "চলুন আজ নতুন কিছু শেখা যাক",
        icon: "success"
        });
    }


})

//logout btn work

document.getElementById("logout-btn").addEventListener('click', (e) => {
    e.preventDefault();
    //console.log('logout');
    window.location.href = "index.html"; // redirect হবে
});


// show loader function

const showLoader = () => {
    document.getElementById('loader').classList.remove("hidden");
    document.getElementById('word-container').classList.add("hidden");
    document.get
}

// hidden loader function

const hiddenLoader = () => {
    document.getElementById('loader').classList.add("hidden");
    document.getElementById('word-container').classList.remove("hidden");
}

//Remove active class toggle 
const removeActiveClass = () => {
    const activeButotn = document.getElementsByClassName("active");

    for (let btn of activeButotn) {
        btn.classList.remove("active");
    }
}


//show all words for section by individual btn items click works start

// fetch all words 
const fetchAllWords = () => {
    showLoader();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add("active");

            displayAllWords(data.data);
        });
}

const displayAllWords = (allWords) => {
    
    //get container here
    const divContanier = document.getElementById('word-container');
    document.getElementById('select-container').style.display = 'none';
    divContanier.innerHTML = "";

    if (allWords.length == 0) {
        divContanier.innerHTML = `
        
            <div class="col-span-full flex flex-col justify-center items-center bg-base-200 py-20 px-8 rounded-xl my-12 text-center">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <h3 class="text-[12px] mt-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
                <h1 class="text-2xl mt-4 font-bold">নেক্সট Lesson এ যান</h1>
            </div>
        
        `;
        hiddenLoader();
        return;
    }

    allWords.forEach(item => {
        //create elements
       
        const createDiv = document.createElement('div');

        createDiv.innerHTML = `
        <div class="bg-white shadow-md rounded-xl p-10 text-center">
            <!-- Word -->
            <div class="p-3 hover:bg-[#f2fbfd]">
                <h2 class="text-3xl font-bold text-gray-800">${item.word}</h2>

                <!-- Meaning -->
                <p class="mt-2 text-gray-600 font-bold">Meaning / Pronounciation</p>

                <!-- Translation -->
                <p class="mt-3 text-xl font-bold">"${item.meaning == null ? `অর্থ নেই ` : `${item.meaning}`} / ${item.pronunciation}"</p>

                <!-- Buttons -->
                <div class="flex justify-between mt-6">
                    <button onclick="fetchWordDetailDisplay(${item.id})" class="bg-gray-200 px-3 py-1 hover:bg-gray-300">
                        <i class="fas fa-info"></i> <!-- info icon -->     
                    </button>
                    <button onclick="handleSpeakingWork('${item.word}')" class="bg-gray-200 px-3 py-1 hover:bg-gray-300">
                        <i class="fas fa-volume-up"></i> <!-- sound icon -->
                    </button>
                </div>
            </div>
        </div>
        
        `
        divContanier.appendChild(createDiv);
    });
    hiddenLoader();
}

//show all words for section by individual btn items click works start


//voice speeking work 

const handleSpeakingWork = (word) => {
    
    const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN'; // Japanese
    window.speechSynthesis.speak(utterance);
    
}

// fetch word details 
const fetchWordDetailDisplay = (id) => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayWordDetailsAll(data.data));
}


// display word details 
const displayWordDetailsAll = (items) => {
  
    document.getElementById("word_details").showModal();

    const modelContainer = document.getElementById('model-container');

    modelContainer.innerHTML = `
        <div class="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6">
            <!-- Title -->
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
                ${items.word} <span class="text-xl font-bold"> (🎤: ${items.pronunciation}) </span>
            </h2>

            <!-- Meaning -->
            <p class="text-xl font-bold text-gray-800">Meaning</p>
            <p class="mb-3 font-bold text-gray-700">${items?.meaning == null ? `অর্থ পাওয়া যায় নি` : `${items.meaning}`}</p>

            <!-- Example -->
            <p class="text-xl font-bold text-gray-800">Example</p>
            <p class="mb-3 font-bold text-gray-700">${items.sentence}</p>

            <!-- Similar Words -->
            
            ${items.synonyms.length === 0 ?
        
                `<p class="font-blod text-xl text-gray-900 mb-2">সমার্থক শব্দ গুলো</p> `
        
                    :
        
                `
                    <p class="font-blod text-xl text-gray-900 mb-2">সমার্থক শব্দ গুলো</p>
                    <div class="flex gap-2 mb-4">
                        <span class="px-3 py-1 border rounded-md bg-gray-100 text-sm cursor-pointer">${items.synonyms[0]}</span>
                        <span class="px-3 py-1 border rounded-md bg-gray-100 text-sm cursor-pointer">${items.synonyms[1]}</span>
                        <span class="px-3 py-1 border rounded-md bg-gray-100 text-sm cursor-pointer">${items.synonyms[2]}</span>
                    </div> 
                `
            }
            

            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="px-4 py-2 flex justify-start bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
                </form>
            </div>

            <!-- Close Button -->
            
        </div>
    
    `
}

// load individual words by click individual button
const fetchloadIndividualButtonClickByWords = (id) => {
    //console.log(id)
    showLoader();
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);

            clickedButton.classList.add("active");
            

            displayAllWords(data.data);
        });
    //console.log(url)
}


//button fetching and load All button in display show start 

const fetchBtnAll = () => {
    
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayAllLessonButton(data.data));
}

const displayAllLessonButton = (btnAll) => {

    //get the container
    const lesonContainer = document.getElementById('leson-container');

    btnAll.forEach(item => {
        //create element 
        const createBtn = document.createElement('a');
        createBtn.innerHTML = `
         <a id="btn-${item.level_no}" onclick="fetchloadIndividualButtonClickByWords(${item.level_no})" class="btn border-[#422ad5] text-[#422ad5] hover:bg-[#422ad5] hover:text-white"><img src="./assets/fa-book-open.png" alt="">${item.lessonName}</a>
        `
        //append childNodes
        lesonContainer.appendChild(createBtn);
    });

    
}
fetchBtnAll();

// button fetching and load All button in display show end
















// const displayLessonButton = async () => {

//     //fetch categories button
//     const res = await fetch("https://openapi.programming-hero.com/api/levels/all");

//     const data = await res.json();

//     //get category container
//      const lesonContainer = document.getElementById('leson-container');

//     //get all categories loop using forEach
//     data.data.forEach(item => {


//         //create element a button
//     const createBtn = document.createElement('a');
//     createBtn.innerHTML = `
//          <a onclick="" class="btn border-[#422ad5] text-[#422ad5] hover:bg-[#422ad5] hover:text-white"><img src="./assets/fa-book-open.png" alt="">${item.lessonName}</a>
    
//     `
//     lesonContainer.appendChild(createBtn);
//     });
// }
// displayLessonButton();
