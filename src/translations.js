const translations = {
  /* HER STÅR DE DANSKE TEKSTER TIL DIVERSE SIDER */
  da: {
    rygning: {
      left: {
        label: "Rygning Historisk",
        heading: "Rygning Historisk",
        intro:
          'Læger har vidst siden midten af 1900-tallet, at rygning øger risikoen for hjerte-kar-sygdom. Mænd har historisk set røget mere end kvinder. Derfor blev blodpropper i hjertet opfattet som en mandesygdom eller "direktørsygdom", fordi det i høj grad var mænd med store cigarer og store maver, der blev ramt.',
        body: "",
        stats: [
          { value: "75%", description: "af mænd røg i 1950" },
          { value: "40%", description: "af kvinder røg i 1950" },
        ],
      },
      right: {
        label: "Rygning i dag og kvinders hjerter",
        heading: "Rygning i dag og kvinders hjerter",
        intro:
          'I dag ryger lige mange kvinder og mænd, men forskning har vist, at rygning er "farligere" for kvinders hjerter.',
        body: "Hvis en kvinde ryger stiger hendes risiko for en hjertekarsygdom med 25 % mere, end en mands gør.\n\nForskere er ikke klar over, hvad årsagen er.",
        stats: [
          { value: "25%", description: "Større risiko for kvinder end mænd" },
        ],
      },
      dragLabel: "Rygning og hjerte-kar-sygdomme - før og nu",
    },
    kraeftbehandling: {
      steps: [
        {
          heading: "Brystkræft og hjertesygdomme",
          body: "Hvis man er blevet behandlet for brystkræft, har man større risiko for senere at udvikle en hjertesygdom. 99 % af patienter med brystkræft er kvinder.\n\n9 ud af 10 af brystkræftpatienter får stråling som en del af deres behandling.",
          link: "Prøv at fjerne kræftknuden med stråling",
        },
        {
          heading: "Stråling mod brystkræft kan skade hjertet",
          body: "Du fjernede kræftknuden, men der var også en del af strålingen, der ramte hjertet. Det kan give ar på hjertemusklen og føre til sygdom.\n\nForskningen i sammenhængen mellem (behandling af) brystkræft og hjertesygdom er især vokset inden for de seneste 20–25 år.",
          link: null,
        },
      ],
    },
    startside: {
      heading: "Det oversete hjerte",
      body: "Tryk på kroppen og dyk ned i oversete sammenhænge mellem krop, køn og hjerte-kar-sygdom",
    },
    hjerteknap: {
      heading: "Om hjertet",
    },
    depression: {
      neurons: [
        {
          heading: "Depression og hjertet",
          body: "Depression og andre psykiske forhold kan påvirke hjertet negativt. Forskere er først begyndt at undersøge sammenhængen mellem hjernen og hjerte-kar-sygdomme inden for de seneste 20-30 år.",
        },
        {
          heading: "Depression rammer flest kvinder",
          body: "Dobbelt så mange kvinder som mænd bliver ramt af depression i løbet af livet. Derfor er depression særligt en overset risiko for hjerte-kar-sygdom hos kvinder.",
        },
        {
          heading: "Depression kan gøre hjertet sygt",
          body: "Nyere forskning viser, at hvis man bliver ramt af depression, har man større risiko for at blive ramt af hjerte-kar-sygdom senere i livet.",
        },
        {
          heading: "Hjertesygdomme bliver værre af depression",
          body: "Hvis man i forvejen har en hjerte-kar-sygdom, og bliver ramt af depression, vil sygdommen blive værre hurtigere.",
        },
      ],
    },
    blodsukker: {
      men: "Mænd",
      women: "Kvinder",
      sliderLow: "Normalt",
      sliderHigh: "Diabetes",
      stageLabels: ["Normalt blodsukker", "Forhøjet blodsukker", "Diabetes"],
      steps: [
        {
          heading: "Diabetes og hjertet",
          body: "Diabetes er en sygdom som gør, at man har for meget sukker i blodet. Sygdommen påvirker mænd og kvinders hjerter på forskellige måder.",
        },
        {
          heading: "Risikoen stiger",
          body: "Når blodsukkeret stiger, begynder risikoen for hjerte-kar-sygdom at stige for begge køn.",
        },
        {
          heading: "Kvinders hjerter tager større skade",
          body: "Begge køns risiko stiger meget ved diabetes. Kvinders risiko stiger mere end mænds. Forskere er ikke sikre på hvad årsagen er.",
        },
      ],
    },
    quiz: {
      title: "Quiz",
      intro:
        "Test din viden om hjertet og hjertesygdomme. Du vil blive stillet 10 spørgsmål, og efter hvert svar får du en forklaring. God fornøjelse!",
      startBtn: "Start",
      nextBtn: "Næste spørgsmål",
      resultsTitle: "Resultat",
      resultsText:
        "Fedt, godt klaret! Du gjorde det bedre end {percentile} af alle vores besøgende!",
      playAgainBtn: "Prøv igen",
      correctLabel: "Rigtigt!",
      wrongLabel: "Forkert!",
      quitTitle: "Er du sikker?",
      quitBody: "Hvis du forlader quizzen nu, mister du al din fremgang.",
      quitConfirm: "Forlad quiz",
      quitCancel: "Fortsæt quiz",
      questions: [
        {
          question: "[ Spørgsmål 1 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 2 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 3 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 4 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 5 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 6 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 7 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 8 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 9 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
        {
          question: "[ Spørgsmål 10 fra museet ]",
          options: ["[ Svar A ]", "[ Svar B ]", "[ Svar C ]", "[ Svar D ]"],
          correct: 0,
          explanation: "[ Forklaring fra museet ]",
        },
      ],
    },
  },
  /* HER STÅR DE ENGELSKE TEKSTER TIL DIVERSE SIDER */
  en: {
    rygning: {
      left: {
        label: "Smoking - Historic",
        heading: "Smoking - Historic",
        intro: "[ English text from museum ]",
        body: "[ English text from museum ]",
        stats: [
          { value: "75%", description: "of men smoked in 1950" },
          { value: "40%", description: "of women smoked in 1950" },
        ],
      },
      right: {
        label: "Smoking today and women's hearts",
        heading: "Smoking today and women's hearts",
        intro: "[ English text from museum ]",
        body: "[ English text from museum ]",
        stats: [
          { value: "25%", description: "Higher risk for women than men" },
        ],
      },
      dragLabel: "Smoking and cardiovascular disease - then and now",
    },
    kraeftbehandling: {
      steps: [
        {
          heading: "Breast cancer and heart disease",
          body: "[ English text from museum ]",
          link: "Try to remove the tumor with radiation",
        },
        {
          heading: "Radiation for breast cancer can damage the heart",
          body: "[ English text from museum ]",
          link: null,
        },
      ],
    },
    startside: {
      heading: "The overlooked Heart",
      body: "Press on the body to dive into overlooked correlations between the body, gender and cardiovascular disease",
    },
    hjerteknap: {
      heading: "About the Heart",
    },
    depression: {
      neurons: [
        {
          heading: "Depression and the heart",
          body: "Depression and other mental conditions can affect the heart negatively. Researchers have only recently begun to investigate the connection between the brain and cardiovascular disease within the last 20-30 years.",
        },
        {
          heading: "Depression affects more women",
          body: "Twice as many women as men are affected by depression during their lifetime. Therefore, depression is particularly an overlooked risk factor for cardiovascular disease in women.",
        },
        {
          heading: "Depression can make the heart sick",
          body: "Newer research shows that if you are affected by depression, you have a greater risk of developing cardiovascular disease later in life.",
        },
        {
          heading: "Heart disease gets worse with depression",
          body: "If you already have cardiovascular disease and are affected by depression, the disease will get worse faster.",
        },
      ],
    },
    blodsukker: {
      men: "Men",
      women: "Women",
      sliderLow: "Normal",
      sliderHigh: "Diabetes",
      stageLabels: ["Normal blood sugar", "Elevated blood sugar", "Diabetes"],
      steps: [
        {
          heading: "Diabetes and the heart",
          body: "Diabetes is a disease that causes too much sugar in the blood. The disease affects men's and women's hearts in different ways.",
        },
        {
          heading: "The risk increases",
          body: "As blood sugar rises, the risk of cardiovascular disease starts to increase for both sexes.",
        },
        {
          heading: "Women's hearts suffer more",
          body: "The risk increases a lot for both sexes with diabetes. Women's risk increases more than men's. Researchers are not sure what the reason is.",
        },
      ],
    },
    quiz: {
      title: "Quiz",
      intro:
        "Test your knowledge about the heart and heart disease. You will be asked 10 questions, and after each answer you will get an explanation. Good luck!",
      startBtn: "Start",
      nextBtn: "Next question",
      resultsTitle: "Results",
      resultsText:
        "Well done! You did better than {percentile} of all our visitors!",
      playAgainBtn: "Try again",
      correctLabel: "Correct!",
      wrongLabel: "Wrong!",
      quitTitle: "Are you sure?",
      quitBody: "If you leave the quiz now, you will lose all your progress.",
      quitConfirm: "Leave quiz",
      quitCancel: "Continue quiz",
      questions: [
        {
          question: "[ Question 1 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 2 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 3 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 4 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 5 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 6 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 7 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 8 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 9 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
        {
          question: "[ Question 10 from museum ]",
          options: [
            "[ Answer A ]",
            "[ Answer B ]",
            "[ Answer C ]",
            "[ Answer D ]",
          ],
          correct: 0,
          explanation: "[ Explanation from museum ]",
        },
      ],
    },
  },
};

export default translations;
