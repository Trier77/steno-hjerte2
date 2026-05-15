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
          'I dag ryger lige mange kvinder og mænd, men forskning har vist, at rygning er "farligere" for kvinders hjerter. Hvis en kvinde ryger stiger hendes risiko for en hjertekarsygdom med 25 % mere, end en mands gør. Forskere er ikke klar over, hvad årsagen er.',
        body: "",
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
      body: "Tryk på kroppen og undersøg sammenhænge mellem køn og hjertekarsygdomme.",
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
          body: 'Begge køns risiko for at få en hjerte-kar-sygdom stiger meget, hvis de bliver ramt af diabetes. Kvinders risiko stiger mere end mænds. Forskere er ikke sikre på, hvad der gør diabetes "farligere" for kvinder.',
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
    notFound: {
      log: [
        { type: "sys", text: "SYSTEM BOOT… OK" },
        { type: "sys", text: "Tjekker om alt virker…" },
        { type: "ok", text: "Skærm: TIL" },
        { type: "ok", text: "Strøm: TILSTEDE" },
        { type: "ok", text: "Personale: ET STED DERUDE" },
        { type: "ok", text: "Kaffe: VARM (sandsynligvis)" },
        { type: "sys", text: "Alt ser fint ud. Indlæser side…" },
        { type: "err", text: "FEJL 0x404 — SIDE_IKKE_FUNDET" },
        { type: "sys", text: "Interessant." },
        { type: "warn", text: "Prøver igen, lidt mere seriøst denne gang…" },
        { type: "err", text: "FEJL 0x404 — STADIG_IKKE_FUNDET" },
        {
          type: "sys",
          text: "Imponerende. Vi ved ikke hvordan, men du er på en eller anden måde endt herude.",
        },
        { type: "warn", text: "Sender hjælpeanmodning…" },
        { type: "sys", text: "Hjælpen er gået hjem for i dag." },
        { type: "warn", text: "Googler fejlkoden…" },
        { type: "sys", text: "Google kender den heller ikke. Det er nyt." },
        { type: "warn", text: "Spørger en kollega…" },
        { type: "sys", text: "Kollegaen pegede på en anden kollega." },
        { type: "warn", text: "Spørger den anden kollega…" },
        { type: "sys", text: "Den anden kollega er på frokost." },
        { type: "warn", text: "Genindlæser side (forsøg 1/3)…" },
        { type: "err", text: "MISLYKKET — SIDEN ER STADIG VÆK" },
        { type: "warn", text: "Genindlæser side (forsøg 2/3)…" },
        { type: "err", text: "MISLYKKET — DEN KOMMER IKKE TILBAGE" },
        { type: "warn", text: "Genindlæser side (forsøg 3/3)…" },
        { type: "err", text: "MISLYKKET — VI HOLDER OP MED AT PRØVE" },
        { type: "sys", text: "Analyserer situationen…" },
        { type: "sys", text: "Situationen er: ikke god." },
        { type: "err", text: "KRITISK FEJL: INGEN VED HVAD DER SKER" },
        { type: "sys", text: "Diagnostik afsluttet. Tak for din tålmodighed." },
        { type: "fin", text: "Konklusion: Prøv at gå tilbage til startsiden." },
      ],

      homeBtn: "< TIL FORSIDEN",
      interference: "INTERFERENS REGISTRERET",
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
          question:
            "Mænd dør tidligere af hjerte-kar-sygdomme end kvinder. Hvor mange år tidligere?",
          options: ["3 år", "7 år", "15 år"],
          correct: 1,
          explanation:
            "Mænd dør i gennemsnit 7 år tidligere af hjerte-kar-sygdomme, end kvinder gør. Dog ved vi mindre om de hjertesygdomme, som primært rammer kvinder.",
        },
        {
          question:
            "Hvornår begynder kvinders risiko for at blive ramt af en hjertekarsygdom at stige meget hurtigt?",
          options: [
            "Når menstruationen begynder",
            "Ved overgangsalderen - når østrogen-niveaut falder",
            "Omkring 40-års alderen",
          ],
          correct: 1,
          explanation:
            "Det kvindelige kønshormon - østrogen - kan beskytte én overfor hjertesygdomme. Derfor bliver kvinder inden overgangsalderen sjældnere ramt af hjertesygdom. Efter overgangsalderen begynder kvinders risiko derfor at stige hurtigt.",
        },
        {
          question:
            "Hvor mange procent af danskere dør af en hjerte-kar-sygdom?",
          options: [" Ca. 5% ", " Ca. 50% ", " Ca. 20% "],
          correct: 2,
          explanation:
            "Omkring 20% af danskerne dør i dag af hjerte-kar-sygdomme, og sygdommene rammer næsten lige mange mænd og kvinder. Hjerte-kar-sygdomme er derfor nogle af de dødeligste sygdomme – kun overgået af kræft.",
        },
        {
          question:
            "Der er mange forskellige slags hjerte-kar-sygdomme, men hvilke er de mest almindelige?",
          options: [
            " Åreforkalkning og blodpropper ",
            " Medfødte hjertefejl ",
            " Hjertesygdomme under graviditet ",
          ],
          correct: 0,
          explanation:
            "Åreforkalkning hænger sammen med livsstil og er én af de mest almindelige sygdomme i blodkarrene. Hvis ens blodårer er fyldt op med kalk, har man stor risiko for at få en blodprop i hjertet.",
        },
        {
          question: "Hvad er IKKE en risikofaktor for hjertesygdom?",
          options: [
            " Rygning ",
            " Overvægt ",
            " Diabetes under graviditet ",
            " Dårlig fordøjelse ",
            " Depression ",
          ],
          correct: 3,
          explanation:
            "Man har længe vidst, at rygning og overvægt kan gøre hjertet sygt. Men inden for de seneste år har forskere opdaget, at ting, som især rammer kvinder - for eksempel depression og diabetes under graviditet - også kan øge risikoen for hjerte-kar-sygdom.",
        },
        {
          question:
            " Overvægt øger risikoen for hjertekarsygdom. Men hvor er det særligt farligt at være overvægtig henne? ",
          options: [
            " Omkring arme og hals ",
            " Omkring maven ",
            " På hofterne ",
            " På brysterne ",
          ],
          correct: 1,
          explanation:
            'Det er særligt fedt omkring maven og de indre organer, der er farligt for hjertet. Mænds fedt sætter sig typisk på maven. Deres overvægt er derfor "mere farlig" end yngre kvinders, hvor fedt i højere grad sætter sig på lår, bryster og hofter. Efter overgangsalderen begynder kvinders fedt dog også at sætte sig omkring maven.',
        },
        {
          question:
            "Dette spørgsmål har Steno ikke fået helt styr på endnu... ",
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
        label: "Smoking — Historic",
        heading: "Smoking — Historic",
        intro:
          'Doctors have known since the mid-20th century that smoking increases the risk of cardiovascular disease. Men have historically smoked more than women. As a result, heart attacks were seen as a male disease — or a "boardroom disease" — because it was largely men with big cigars and big stomachs who were affected.',
        body: "",
        stats: [
          { value: "75%", description: "of men smoked in 1950" },
          { value: "40%", description: "of women smoked in 1950" },
        ],
      },
      right: {
        label: "Smoking today and women's hearts",
        heading: "Smoking today and women's hearts",
        intro:
          "Today, women and men smoke in equal numbers — but research has shown that smoking is more dangerous for women's hearts. If a woman smokes, her risk of cardiovascular disease rises 25% more than a man's does. Researchers are not yet sure what causes this difference.",
        body: "",
        stats: [
          { value: "25%", description: "Higher risk for women than men" },
        ],
      },
      dragLabel: "Smoking and cardiovascular disease — then and now",
    },
    kraeftbehandling: {
      steps: [
        {
          heading: "Breast cancer and heart disease",
          body: "If you have been treated for breast cancer, you have a greater risk of developing heart disease later in life. 99% of breast cancer patients are women.\n\n9 out of 10 breast cancer patients receive radiation as part of their treatment.",
          link: "Try to remove the tumour with radiation",
        },
        {
          heading: "Radiation for breast cancer can damage the heart",
          body: "You removed the tumour, but some of the radiation also reached the heart. This can cause scarring of the heart muscle and lead to disease.\n\nResearch into the connection between breast cancer (and its treatment) and heart disease has grown particularly over the last 20–25 years.",
          link: null,
        },
      ],
    },
    startside: {
      heading: "The Overlooked Heart",
      body: "Press on the body and explore connections between the body, gender and cardiovascular disease",
    },
    hjerteknap: {
      heading: "The heart",
    },
    depression: {
      neurons: [
        {
          heading: "Depression and the heart",
          body: "Depression and other mental health conditions can have a negative impact on the heart. Researchers have only begun to investigate the connection between the brain and cardiovascular disease within the last 20–30 years.",
        },
        {
          heading: "Depression affects more women",
          body: "Twice as many women as men are affected by depression during their lifetime. This makes depression a particularly overlooked risk factor for cardiovascular disease in women.",
        },
        {
          heading: "Depression can make the heart sick",
          body: "Newer research shows that if you are affected by depression, you have a greater risk of developing cardiovascular disease later in life.",
        },
        {
          heading: "Heart disease gets worse with depression",
          body: "If you already have cardiovascular disease and then develop depression, the illness will worsen more rapidly. Some studies show that depression can double the risk of heart disease.",
        },
      ],
    },
    blodsukker: {
      men: "Men",
      women: "Women",
      sliderLow: "Normal",
      sliderHigh: "Diabetes",

      steps: [
        {
          heading: "Diabetes and the heart",
          body: "Diabetes is a disease that causes too much sugar in the blood. The disease affects men's and women's hearts in different ways. Around the age of 50–60, more men than women are affected by cardiovascular disease.",
          hint: "Use the slider to see what happens to the risk of cardiovascular disease if you develop diabetes",
        },
        {
          heading: "The risk increases",
          body: "Both more women and more men are affected by cardiovascular disease if they develop diabetes. For every 10 men around age 50–60 without diabetes who develop cardiovascular disease, around 7 women without diabetes will be affected.",
        },
        {
          heading: "Diabetes makes the heart sick",
          body: "The risk of cardiovascular disease rises sharply for both sexes if they develop diabetes — but women's risk rises more than men's. Researchers are not yet sure what makes diabetes more \"dangerous\" for women.",
        },
      ],
    },
    hormoner: {
      dragHint: "← Age →",
      vesselHintStart: "Drag and explore what happens to women's blood vessels",
      vesselHintStartBold: "as they get older",
      vesselHintEnd: "You have now seen what age does to the blood vessels!",
      sliderStart: "Before",
      sliderEnd: "After",
      stages: [
        {
          heading: "Hormones and women's hearts",
          body: "The sex hormone oestrogen is produced in the ovaries. Oestrogen protects women's bodies against cardiovascular disease up until menopause. How women's hormones affect the heart has only recently begun to receive more attention in research.",
        },
        {
          heading: "Women have high levels of oestrogen in the blood",
          body: "The sex hormone oestrogen protects the heart against calcification, stiff blood vessels and high blood pressure up until menopause.",
          caption: "● Blood vessels are smooth and blood flow is good",
        },
        {
          heading: "Oestrogen levels drop drastically",
          body: "Most women go through menopause between the ages of 45 and 55. After this, oestrogen levels fall and the risk of cardiovascular disease begins to rise sharply. Blood vessels become stiffer and blood pressure rises.",
          caption:
            "● The walls become thicker and calcifications develop on the inside",
        },
        {
          heading: "Women's blood pressure becomes higher than men's",
          body: "Around the age of 60–65, women's blood pressure becomes on average higher than men's. High blood pressure increases the risk of cardiovascular disease.",
          caption: "● Blood pressure rises",
        },
        {
          heading: "Women's and men's blood vessels are equally unhealthy",
          body: "Approximately 20 years after a woman has gone through menopause, her risk of cardiovascular disease is the same as a man's.",
          caption:
            "● Even stronger calcification, stiff vessels and high blood pressure",
        },
        {
          heading: "The overlooked connection:",
          body: "Men die seven years earlier than women from cardiovascular disease, because oestrogen protects women's hearts.\n\nNewer research shows, however, that hormonal conditions such as endometriosis and PCOS can increase women's risk of cardiovascular disease by up to 30%. More research is still needed in this area.",
        },
      ],
    },
    graviditet: {
      labels: [
        "Pregnancy",
        "Gestational diabetes",
        "Pre-eclampsia",
        "Preterm birth",
      ],
      steps: [
        {
          heading: "Pregnancy and women's hearts",
          body: "Heart research has historically focused on men. It is therefore only within the last 20–30 years that researchers have begun to explore the connection between women's pregnancies and cardiovascular disease later in life.",
          link: "Try dragging the speedometer",
        },
        {
          heading: "Diabetes during pregnancy can damage the heart",
          body: "Around 3–4% of all pregnant women develop diabetes during pregnancy. The condition usually disappears shortly after birth. Newer research suggests that gestational diabetes may be an important early indicator of cardiovascular disease later in life.",
        },
        {
          heading: "Pre-eclampsia and the heart",
          body: "Pre-eclampsia is a condition that can develop during pregnancy. Symptoms include headaches and high blood pressure. Newer research shows that women who have had pre-eclampsia have a greater risk of developing cardiovascular disease later in life.",
        },
        {
          heading: "Preterm birth and cardiovascular disease",
          body: "New research has shown that women who give birth 3 weeks before their due date have approximately a 40% higher risk of developing cardiovascular disease later in life. The earlier the birth, the greater the risk.",
        },
      ],
    },
    notFound: {
      log: [
        { type: "sys", text: "SYSTEM BOOT… OK" },
        { type: "sys", text: "Checking if everything works…" },
        { type: "ok", text: "Screen: ON" },
        { type: "ok", text: "Power: PRESENT" },
        { type: "ok", text: "Staff: SOMEWHERE OUT THERE" },
        { type: "ok", text: "Coffee: WARM (probably)" },
        { type: "sys", text: "All looks fine. Loading page…" },
        { type: "err", text: "ERROR 0x404 — PAGE_NOT_FOUND" },
        { type: "sys", text: "Interesting." },
        {
          type: "warn",
          text: "Trying again, slightly more seriously this time…",
        },
        { type: "err", text: "ERROR 0x404 — STILL_NOT_FOUND" },
        {
          type: "sys",
          text: "Impressive. We don't know how, but you have somehow ended up out here.",
        },
        { type: "warn", text: "Sending help request…" },
        { type: "sys", text: "Help has gone home for the day." },
        { type: "warn", text: "Googling the error code…" },
        { type: "sys", text: "Google doesn't know either. That's new." },
        { type: "warn", text: "Asking a colleague…" },
        { type: "sys", text: "The colleague pointed at another colleague." },
        { type: "warn", text: "Asking the other colleague…" },
        { type: "sys", text: "The other colleague is at lunch." },
        { type: "warn", text: "Reloading page (attempt 1/3)…" },
        { type: "err", text: "FAILED — PAGE IS STILL GONE" },
        { type: "warn", text: "Reloading page (attempt 2/3)…" },
        { type: "err", text: "FAILED — IT IS NOT COMING BACK" },
        { type: "warn", text: "Reloading page (attempt 3/3)…" },
        { type: "err", text: "FAILED — WE ARE DONE TRYING" },
        { type: "sys", text: "Analysing the situation…" },
        { type: "sys", text: "The situation is: not great." },
        { type: "err", text: "CRITICAL ERROR: NOBODY KNOWS WHAT IS HAPPENING" },
        {
          type: "sys",
          text: "Diagnostics complete. Thank you for your patience.",
        },
        { type: "fin", text: "Conclusion: Try going back to the front page." },
      ],

      homeBtn: "<TO THE FRONT PAGE",
    },

    quiz: {
      title: "Quiz",
      intro:
        "Test your knowledge about the heart and heart disease. You will be asked 10 questions, and after each answer you will receive an explanation. Good luck!",
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
          question:
            "Men die earlier from cardiovascular disease than women. How many years earlier?",
          options: ["3 years", "7 years", "15 years"],
          correct: 1,
          explanation:
            "Men die on average 7 years earlier from cardiovascular disease than women. However, we know less about the heart diseases that primarily affect women.",
        },
        {
          question:
            "When does women's risk of cardiovascular disease begin to rise very rapidly?",
          options: [
            "When menstruation begins",
            "At menopause — when oestrogen levels drop",
            "Around the age of 40",
          ],
          correct: 1,
          explanation:
            "The female sex hormone oestrogen can protect against heart disease. This is why women before menopause are less frequently affected by heart disease. After menopause, women's risk therefore begins to rise rapidly.",
        },
        {
          question: "What percentage of Danes die from cardiovascular disease?",
          options: ["Approx. 5%", "Approx. 50%", "Approx. 20%"],
          correct: 2,
          explanation:
            "Around 20% of Danes today die from cardiovascular disease, and the diseases affect almost equal numbers of men and women. Cardiovascular diseases are therefore among the deadliest diseases — only surpassed by cancer.",
        },
        {
          question:
            "There are many different types of cardiovascular disease, but which are the most common?",
          options: [
            "Atherosclerosis and blood clots",
            "Congenital heart defects",
            "Heart disease during pregnancy",
          ],
          correct: 0,
          explanation:
            "Atherosclerosis is linked to lifestyle and is one of the most common diseases of the blood vessels. If your blood vessels are filled with calcification, you have a high risk of having a heart attack.",
        },
        {
          question:
            "Which of the following is NOT a risk factor for heart disease?",
          options: [
            "Smoking",
            "Obesity",
            "Diabetes during pregnancy",
            "Poor digestion",
            "Depression",
          ],
          correct: 3,
          explanation:
            "It has long been known that smoking and obesity can damage the heart. But in recent years, researchers have discovered that things that particularly affect women — such as depression and diabetes during pregnancy — can also increase the risk of cardiovascular disease.",
        },
        {
          question:
            "Obesity increases the risk of cardiovascular disease. But where is it particularly dangerous to carry excess weight?",
          options: [
            "Around the arms and neck",
            "Around the abdomen",
            "On the hips",
            "On the chest",
          ],
          correct: 1,
          explanation:
            "It is particularly fat around the abdomen and internal organs that is dangerous for the heart. Men's fat typically settles around the abdomen, making their excess weight more dangerous than that of younger women, where fat more commonly settles on the thighs, chest and hips. After menopause, women's fat also begins to settle around the abdomen.",
        },
        {
          question: "This question hasn't been finalised yet...",
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
