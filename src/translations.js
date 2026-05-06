const translations = {
  da: {
    rygning: {
      left: {
        label: "Rygning Historisk",
        heading: "Rygning Historisk",
        intro:
          "Læger har vidst siden midten af 1900-tallet, at rygning kan give hjertekarsygdom. Mænd har historisk set røget mere end kvinder. I 1950 røg 60% af alle mænd. Det samme gjaldt kun for 10% af kvinderne.",
        body: 'Derfor blev blodpropper i hjertet opfattet som en mandesygdom eller en "direktørsygdom" fordi det i høj grad var mænd med store cigarer, store maver og manglende motion, der blev ramt.',
        stats: [
          { value: "60%", description: "mænd røg i 1950" },
          { value: "10%", description: "Kvinder røg i 1950" },
        ],
      },
      right: {
        label: "Rygning i dag",
        heading: "Rygning i dag",
        intro: "I dag ryger lige mange kvinder og mænd.",
        body: 'Og faktisk har det vist sig, at de kvinder der ryger har op mod 25% større risiko for at få en hjertesygdom, end mænd der ryger. Rygning er derfor "farligere" for kvinders hjerter end for mænds. Forskere er ikke klar over, hvad årsagen er.',
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
