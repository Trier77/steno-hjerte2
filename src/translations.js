const translations = {
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
  },
  en: {
    rygning: {
      left: {
        label: "Smoking - Historic",
        heading: "Smoking - Historic",
        intro: "[ English text from museum ]",
        body: "[ English text from museum ]",
        stats: [
          { value: "60%", description: "men smoked in 1950" },
          { value: "10%", description: "women smoked in 1950" },
        ],
      },
      right: {
        label: "Smoking today",
        heading: "Smoking today",
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
          heading: "The heart was damaged",
          body: "Treatment for breast cancer can make the heart sick. Both radiation and chemotherapy can damage the heart's healthy cells and increase the risk of heart disease later in life.",
          link: null,
        },
        {
          heading: "Breast cancer treatment",
          body: "[ English text from museum ]",
          link: "Try to remove the tumor",
        },
        {
          heading: "Breast cancer treatment",
          body: "[ English text from museum ]",
          link: "Check up on the Heart",
        },
      ],
    },
  },
};

export default translations;
