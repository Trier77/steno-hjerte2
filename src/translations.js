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
      heading: "Det Oversete Hjerte",
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
          body: "Hvis man i forvejen har en hjerte-kar-sygdom, og bliver ramt af depression, vil sygdommen blive værre hurtigere. Nogle studier viser, at depression kan fordoble risikoen for hjertesygdom.",
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
          body: "Diabetes er en sygdom, som gør, at man har for meget sukker i blodet. Sygdommen påvirker mænd og kvinders hjerter på forskellige måder. Omkring de 50-60 år bliver flere mænd end kvinder ramt af hjerte-kar-sygdomme.",
          hint: "Brug slideren og se hvad der sker med risikoen for hjerte-kar-sygdomme, hvis man får diabetes",
        },
        {
          heading: "Risikoen stiger",
          body: "Både flere kvinder og flere mænd bliver ramt af hjerte-kar-sygdom, hvis de får diabetes. Hvis 10 mænd omkring 50-60 år uden diabetes bliver ramt af en hjerte-kar-sygdom, vil omkring 7 kvinder uden diabetes blive ramt.",
        },
        {
          heading: "Diabetes gør hjertet sygt",
          body: "Begge køns risiko for at få en hjerte-kar-sygdom stiger meget, hvis de bliver ramt af diabetes. Kvinders risiko stiger mere end mænds. Forskere er ikke sikre på, hvad der gør diabetes “farligere” for kvinder.",
        },
      ],
    },
    hormoner: {
      dragHint: "← Alder →",
      vesselHintStart: "Træk og undersøg, hvad der sker med kvinders blodkar,",
      vesselHintStartBold: "når de bliver ældre",
      vesselHintEnd: "Du har nu set, hvad alderen gør ved blodkarrene!",
      sliderStart: "Før",
      sliderEnd: "Efter",
      stages: [
        {
          heading: "Hormoner og kvinders hjerter",
          body: "Kønshormonet østrogen dannes i æggestokkene. Østrogen beskytter kvinders kroppe mod hjerte-kar-sygdom frem til overgangsalderen. Hvordan kvinders hormoner påvirker hjertet, er først for nylig begyndt at få mere opmærksomhed i forskning.",
        },
        {
          heading: "Kvinder har meget østrogen i blodet",
          body: "Kønshormonet østrogen beskytter hjertet mod forkalkning, stive blodkar og højt blodtryk frem til overgangsalderen.",
          caption: "● Blodårerne er glatte og flowet er godt",
        },
        {
          heading: "Mængden af østrogen falder drastisk",
          body: "De fleste kvinder går i overgangsalderen, når de er mellem 45 og 55 år. Herefter falder mængden af østrogen, og risikoen for hjerte-kar-sygdomme begynder at stige kraftigt. Blodkarrene bliver stivere, og blodtrykket stiger.",
          caption:
            "● Væggene bliver tykkere, og der opstår forkalkninger på indersiden",
        },
        {
          heading: "Kvinders blodtryk bliver højere end mænds",
          body: "Omkring 60-65-årsalderen bliver kvinders blodtryk gennemsnitligt højere end mænds. Forhøjet blodtryk øger risikoen for hjerte-kar-sygdomme.",
          caption: "● Blodtrykket bliver hurtigere",
        },
        {
          heading: "Kvinder og mænds blodkar er lige syge",
          body: "Omtrent 20 år efter, at en kvinde er gået i overgangsalderen, er deres risiko for hjerte-kar-sygdom den samme som mænds.",
          caption:
            "● Endnu stærkere åreforkalkning, stive kar og højt blodtryk",
        },
        {
          heading: "Den oversete sammenhæng:",
          body: "Mænd dør syv år tidligere end kvinder af hjerte-kar-sygdom, fordi østrogen beskytter kvinders hjerter.\n\nNyere forskning viser dog, at sygdomme i kvinders hormoner som for eksempel endometriose og PCOS kan øge risikoen for hjerte-kar-sygdom med op til 30 %. Der mangler stadig forskning på området.",
        },
      ],
    },
    graviditet: {
      labels: [
        "Graviditet",
        "Graviditetsdiabetes",
        "Svangerskabsforgiftning",
        "For tidlig fødsel",
      ],
      steps: [
        {
          heading: "Graviditet og kvinders hjerter",
          body: "Hjerteforskning har historisk været fokuseret på mænd. Derfor er det først inden for de seneste 20-30 år, at forskere er begyndt at dykke ned i sammenhængen mellem kvinders graviditeter og hjerte-kar-sygodom senere i livet.\n\n9 ud",
          link: "Prøv at trække i speedometeret",
        },
        {
          heading: "Diabetes under graviditet kan gøre hjertet sygt",
          body: "Omkring 3-4% af alle gravide udvikler diabetes under en graviditet. Sygdommen forsvinder som regel kort tid efter fødslen. Nyere forskning på, at graviditetsdiabetes kan være et vigtigt tegn på hjerte-kar-sygdom senere i livet.",
        },
        {
          heading: "Svangerskabsforgiftning og hjertet",
          body: "Svangerskabsforgiftning er en sygdom, man kan få som gravid. Symptomerne er blandt andet hovedpine og forhøjet blodtryk. Nyere forskning viser, at kvinder, der har haft svangerskabsforgiftning, har større risiko for atfå en hjerte-kar-sygdom senere i livet.",
        },
        {
          heading: "For tidlig fødsel og hjerte-kar-sygdom",
          body: "Ny forskning har vist, at kvinder der føder 3 uger før termin, har cirka 40% øget risiko for senere at udvikle en hjerte-kar-sygdom. Risikoen bliver større jo tidligere fødslen sker.",
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
      resultsHeading: "Resultat",
      resultsBetterThan: "Du klarede dig bedre end",
      resultsOfVisitors: "af alle andre besøgende",
      resultsBasedOn: "Baseret på",
      resultsAttempts: "forsøg i alt",
      resultsMessages: {
        top90:
          "Imponerende! Du er en af de skarpeste hjerte-kendere vi har set! 🏆",
        top70:
          "Godt klaret! Du ved markant mere om hjertet end de fleste besøgende.",
        top50:
          "Flot! Du klarer dig over middel — hjertet har ingen hemmeligheder for dig.",
        top30:
          "Ikke dårligt! Der er stadig et par ting at lære om det oversete hjerte.",
        below30: "Hjertet gemmer stadig på hemmeligheder for dig — prøv igen!",
      },
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
          body: "If you already have a cardiovascular disease and are struck by depression, the illness will worsen more quickly. Some studies show that depression can double the risk of heart disease.",
        },
      ],
    },
    blodsukker: {
      men: "Men",
      women: "Women",
      sliderLow: "Normal",
      sliderHigh: "Diabetes",
      stageLabels: ["Normal blood sugar", "Elevated blood sugar", "Diabetes"],
      bubbleText: "Diabetes causes more sugar in the blood",
      steps: [
        {
          heading: "Diabetes and the heart",
          body: "Around the age of 50-60, more men than women are affected by cardiovascular disease.",
          hint: "Use the slider to see what happens to the risk of cardiovascular disease if you develop diabetes",
        },
        {
          heading: "The risk increases",
          body: "Both more women and more men are affected by cardiovascular disease if they develop diabetes.",
        },
        {
          heading: "Diabetes makes the heart sick",
          body: "Diabetes affects women's hearts harder than men's. Researchers are still not entirely sure what makes diabetes more \"dangerous\" for women.",
        },
      ],
    },
    hormoner: {
      dragHint: "← Age →",
      vesselHintStart: "What happens to women's blood vessels over the years?",
      vesselHintStartBold: "Drag and see!",
      vesselHintEnd:
        "You have now seen what the years do to the blood vessels.",
      sliderStart: "Before",
      sliderEnd: "After",
      stages: [
        {
          heading: "Hormones and women's hearts",
          body: "The sex hormone oestrogen is produced in the ovaries. Oestrogen protects women's bodies against cardiovascular disease until menopause. How women's hormones affect the heart has only recently begun to receive more attention in research.",
        },
        {
          heading: "Women have a lot of oestrogen in the blood",
          body: "The sex hormone oestrogen protects the heart against calcification, stiff blood vessels and high blood pressure until menopause.",
          caption: "● Blood vessels are smooth and flow is good",
        },
        {
          heading: "The amount of oestrogen drops drastically",
          body: "Most women go through menopause between the ages of 45 and 55. After this, the amount of oestrogen falls, and the risk of cardiovascular disease begins to rise sharply. Blood vessels become stiffer and blood pressure rises.",
          caption:
            "● The walls become thicker and calcifications appear on the inside",
        },
        {
          heading: "Women's blood pressure becomes higher than men's",
          body: "Around the age of 60-65, women's blood pressure becomes on average higher than men's. High blood pressure increases the risk of cardiovascular disease.",
          caption: "● Blood pressure increases",
        },
        {
          heading: "Women and men's blood vessels are equally unhealthy",
          body: "Approximately 20 years after a woman has gone through menopause, their risk of cardiovascular disease is the same as men's.",
          caption:
            "● Even stronger calcification, stiff vessels and high blood pressure",
        },
        {
          heading: "The overlooked connection: hormones and the heart",
          body: "Men die seven years earlier than women from cardiovascular disease, because oestrogen protects women's hearts.\n\nNewer research shows that diseases in women's hormones such as endometriosis and PCOS can increase the risk of cardiovascular disease by up to 30%. More research is still needed in this area.",
        },
      ],
    },
    graviditet: {
      labels: [
        "Pregnancy",
        "Pregnancy diabetes",
        "Early births",
        "Svangerskabsforgiftning",
      ],
      steps: [
        {
          heading: "Pregnancy and womens hearts",
          body: "Hjerteforskning har historisk været fokuseret på mænd. Derfor er det først inden for de seneste 20-30 år, at forskere er begyndt at dykke ned i sammenhængen mellem kvinders graviditeter og hjerte-kar-sygodom senere i livet.\n\n9 ud",
          link: "Try dragging the speedometer",
        },
        {
          heading: "Diabetes under pregnancy kan make the heart sick",
          body: "Omkring 3-4% af alle gravide udvikler diabetes under en graviditet. Sygdommen forsvinder som regel kort tid efter fødslen. Nyere forskning på, at graviditetsdiabetes kan være et vigtigt tegn på hjerte-kar-sygdom senere i livet.",
        },
        {
          heading: "Svangerskabsforgiftning and the heart",
          body: "Svangerskabsforgiftning er en sygdom, man kan få som gravid. Symptomerne er blandt andet hovedpine og forhøjet blodtryk. Nyere forskning viser, at kvinder, der har haft svangerskabsforgiftning, har større risiko for atfå en hjerte-kar-sygdom senere i livet.",
        },
        {
          heading: "Early birth and cardiovascular disease",
          body: "Ny forskning har vist, at kvinder der føder 3 uger før termin, har cirka 40% øget risiko for senere at udvikle en hjerte-kar-sygdom. Risikoen bliver større jo tidligere fødslen sker.",
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
      resultsHeading: "Result",
      resultsBetterThan: "You did better than",
      resultsOfVisitors: "of all other visitors",
      resultsBasedOn: "Based on",
      resultsAttempts: "attempts in total",
      resultsMessages: {
        top90:
          "Impressive! You're one of the sharpest heart experts we've seen! 🏆",
        top70:
          "Well done! You know significantly more about the heart than most visitors.",
        top50:
          "Great! You're above average — the heart holds no secrets for you.",
        top30:
          "Not bad! There are still a few things to learn about the overlooked heart.",
        below30: "The heart still has secrets for you — try again!",
      },
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
