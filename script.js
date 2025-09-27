// ~~~~~~~~~~~Sounds~~~~~~~~~~~~
const clickSoundNav = new Audio('ding1.wav');
clickSoundNav.preload = "auto";
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    clickSoundNav.currentTime = 0;
    clickSoundNav.play();
  });
});


const clickSoundOption = new Audio('shortDing.mp3');
clickSoundOption.preload = "auto";
const optionBtn = document.querySelectorAll('.choiceBtn');
optionBtn.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    clickSoundOption.currentTime = 0;
    clickSoundOption.play();
  });
});

const resultSound = new Audio('results.wav'); 
resultSound.preload = "auto";

// ~~~~~~~~~~~Quiz~~~~~~~~~~~~

// Score tracker
let scores = {
  "microwave": 0,
  "rug": 0,
  "fan": 0,
  "plant": 0,
  "blender": 0,
  "lamp": 0,
  "shelf": 0,
  "clock": 0
};

const quizdata = {
  "1": {
    text: "What’s your favorite room in the house?",
    choices: [
      {
        choiceText: "Kitchen",
        nextState: 2,
        personalityPts: ["microwave", "blender"]
      },
      {
        choiceText: "Living Room",
        nextState: 2,
        personalityPts: ["rug", "plant"]
      },
      {
        choiceText: "Bedroom",
        nextState: 2,
        personalityPts: ["fan", "clock"]

      },
      {
        choiceText: "Bathroom",
        nextState: 2,
        personalityPts: ["shelf", "clock"]

      }
    ]

  },
  "2": {
    text: "How would your friends describe you?",
    choices: [
      {
        choiceText: "Loud & Energetic",
        nextState: 3,
        personalityPts: ["blender", "fan"]
      },
      {
        choiceText: "Sarcastic & Tired",
        nextState: 3,
        personalityPts: ["lamp", "rug"]
      },
      {
        choiceText: "Quiet & Kind",
        nextState: 3,
        personalityPts: ["shelf", "microwave"]

      },
      {
        choiceText: "Confusing & Mysterious",
        nextState: 3,
        personalityPts: ["clock", "fan"]

      }
    ]

  },
  "3": {
    text: "What do you do when you get an assignment in school?",
    choices: [
      {
        choiceText: "Try to finish it as fast as possible; maximize efficiency",
        nextState: 4,
        personalityPts: ["fan"]
      },
      {
        choiceText: "Do the work, but also make sure you understand everything thoroughly",
        nextState: 4,
        personalityPts: ["clock", "lamp"]
      },
      {
        choiceText: "Ask other people for help/cross check answers while you do it",
        nextState: 4,
        personalityPts: ["shelf", "microwave", "clock"]

      },
      {
        choiceText: "Just leave it be; You don't do it",
        nextState: 4,
        personalityPts: ["rug", "fan"]

      }
    ]

  },
  "4": {
    text: "Which of these situations would represent your dream Saturday?",
    choices: [
      {
        choiceText: "Hanging out with friends: going to the mall, eating out, watching movies, etc.",
        nextState: 5,
        personalityPts: ["blender", "lamp"]
      },
      {
        choiceText: "Lazing around, making comfort food, catching up on rest",
        nextState: 5,
        personalityPts: ["clock", "shelf", "rug", "microwave"]
      },
      {
        choiceText: "Finishing work, going on a run, being productive",
        nextState: 5,
        personalityPts: ["lamp", "fan"]

      },
      {
        choiceText: "Traveling, going on hikes, visiting tourist spots",
        nextState: 5,
        personalityPts: ["plant", "lamp"]

      }
    ]

  },
  "5": {
    text: "What color scheme would you like your house to be?",
    choices: [
      {
        choiceText: "Vibrant! Pops of color everywhere!",
        nextState: 6,
        personalityPts: ["blender", "plant"]
      },
      {
        choiceText: "Heavy Neutrals! Beige, Brown, White, Grey, Black!",
        nextState: 6,
        personalityPts: ["lamp", "rug"]
      },
      {
        choiceText: "A main color and some accents! Brown with green, Blue with black, etc.",
        nextState: 6,
        personalityPts: ["clock", "fan", "plant"]

      },
      {
        choiceText: "Light colors only! White, Light brown, Pale yellow, etc",
        nextState: 6,
        personalityPts: ["shelf", "microwave"]

      }
    ]

  },
  "6": {
    text: "What gift would you love to receive for a house warming?",
    choices: [
      {
        choiceText: "A unique lamp!",
        nextState: 7,
        personalityPts: ["fan", "microwave"]
      },
      {
        choiceText: "A handmade ceramic set!",
        nextState: 7,
        personalityPts: ["lamp", "blender"]
      },
      {
        choiceText: "A nice set of high quality coasters!",
        nextState: 7,
        personalityPts: ["clock", "plant"]

      },
      {
        choiceText: "A floral arrangement!",
        nextState: 7,
        personalityPts: ["shelf", "microwave", "rug"]

      }
    ]
  },
  "7": {
    text: "Which concept feels more like you?",
    choices: [
      {
        choiceText: "A song that you can never get tired of",
        nextState: 8,
        personalityPts: ["fan", "rug", "lamp"]
      },
      {
        choiceText: "Smaller real life character customization: glasses frames, nail polish, tattoos, etc.",
        nextState: 8,
        personalityPts: ["plant", "blender"]
      },
      {
        choiceText: "Your brain clicking when you understanding something",
        nextState: 8,
        personalityPts: ["clock", "shelf"]

      },
      {
        choiceText: "The feeling of cold cotton bedsheets",
        nextState: 8,
        personalityPts: ["microwave", "rug"]

      }
    ]
  },
  "8": {
    text: "Last one! What would you like to be known for?",
    choices: [
      {
        choiceText: "Being someone helpful and kind",
        nextState: 0,
        personalityPts: ["shelf", "microwave"]
      },
      {
        choiceText: "Being someone realistic and goal-driven",
        nextState: 0,
        personalityPts: ["fan", "blender"]
      },
      {
        choiceText: "Being someone inspiring and hardworking",
        nextState: 0,
        personalityPts: ["lamp", "rug"]

      },
      {
        choiceText: "Someone relatable and familiar",
        nextState: 0,
        personalityPts: ["clock", "plant"]

      }
    ]
  }
}
let currentState = 1;

function renderState(state) {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');

    choicesContainer.innerHTML = '';

    questionText.textContent = quizdata[state].text;

    // Loop through choices and create buttons
    quizdata[state].choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.choiceText;
        btn.className = 'choice-button';

        btn.onclick = () => {
            // Add personality points
            choice.personalityPts.forEach(pt => {
                scores[pt]++;
            });

            // Move to next state
            if (choice.nextState === 0) {
                showResults();
            } else {
                renderState(choice.nextState);
            }
        };

        choicesContainer.appendChild(btn);
    });
}
const resultDescriptions = {
    "microwave": "You're a part of the kitchen alongside the blender! You're reliable and kind, and you value doing the right thing. Others enjoy being in your company.",
    "rug": "You're a part of the livingroom alongside the plant and occasionally the lamp and clock! You value privacy and being self reliant is important to you! Even though sometimes it's hard for others to tell what you think, your contributions are always appreciated.",
    "fan": "You're a part of the bedroom alongside the shelf and occasionally the lamp and clock! Getting things done and doing your job is important to you and, just like a fan, you try your best to finish in a timely manner.",
    "plant": "You're a part of the livingroom alongside the rug and occasionally the lamp and clock! You value humor and having fun when going about your day. You always find a way to entertain others.",
    "blender": "You're a part of the kitchen alongside the microwave! Your sometimes loud but completely vibrant personality makes you fun to be around! You value your relationships with others and you're a people-person.",
    "lamp": "You're a part of the livingroom and the bedroom at times. Seeing you work hard and give it your all always makes other people look up to you. You value consistency since you believe that it'll help you achive your goals!",
    "shelf": "You're a part of the bedroom alongside the fan and occasionally the lamp and clock! You're always on the lookout to help others, and everyone enjoys spending time with you!",
    "clock": "You're a part of the livingroom and the bedroom at times. You value knowledge and understanding, and you often find yourself spending your free time learning new things."
};

function showResults() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    const resultContainer = document.getElementById('result-container');

    // Clear choices grid
    choicesContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    // Find max score
    let maxScore = 0;
    let winner = '';
    for (const [key, value] of Object.entries(scores)) {
        if (value > maxScore) {
            maxScore = value;
            winner = key;
        }
    }
    
    questionText.textContent = `You are a... ${winner}!`;

    // Add result image
    const resultImage = document.createElement('img');
    resultImage.id = 'result-img';
    resultImage.src = `itemImg/${winner}.png`;
    resultImage.alt = winner;
    resultImage.style.width = '200px';
    resultImage.style.marginTop = '20px';
    resultImage.style.display = 'block';
    resultImage.style.marginLeft = 'auto';
    resultImage.style.marginRight = 'auto';

    resultContainer.appendChild(resultImage);
    resultSound.currentTime = 0;
    resultSound.play();


    const description = document.createElement('p');
    description.textContent = resultDescriptions[winner];
    description.style.textAlign = 'center';
    description.style.fontSize = '15px';
    choicesContainer.appendChild(description);
}

//Start
window.onload = () => renderState(currentState);


