const dictionary = {
  NavigationLayout: {
    SideNav: {
      budgetsItem: {
        title: { en: "Budgets", pl: "Budżety", fr: "Budgets" },
        searchInputPlaceholder: {
          en: "Search budget",
          pl: "Wyszukaj budżet",
          fr: "Rechercher un budget",
        },
        buttonLabel: {
          en: "Add new budget",
          pl: "Dodaj nowy budżet",
          fr: "Ajouter un nouveau budget",
        },
      },
      reportsItem: {
        title: { en: "Reports", pl: "Raporty", fr: "Rapports" },
      },
      settingsItem: {
        title: { en: "Settings", pl: "Ustawienia", fr: "Paramètres" },
      },
      teamsItem: {
        title: { en: "Teams", pl: "Zespoły", fr: "Équipes" },
        searchInputPlaceholder: {
          en: "Search team",
          pl: "Wyszukaj zespół",
          fr: "Rechercher un équipe",
        },
        buttonLabel: {
          en: "Add new member",
          pl: "Dodaj nowego członka",
          fr: "Ajouter un nouveau membre",
        },
      },
    },
  },
  RegFlowLayout: {
    signIn: {
      h1: {
        en: "Log in with your email",
        pl: "Zaloguj się za pomocą swojego adresu email",
        fr: "Connectez-vous avec votre email",
      },
      paragraph: {
        en: "Use your email to log in to your team workspace",
        pl: "Użyj swojego adresu email, aby zalogować się do obszaru roboczego zespołu",
        fr: "Utilisez votre email pour vous connecter à l'espace de travail d'équipe",
      },
    },
    signUp: {
      h1: {
        en: "Get started with your free account today",
        pl: "Zacznij korzystać z bezpłatnego konta już dziś",
        fr: "Commencez dès aujourd'hui avec votre compte gratuit",
      },
      paragraph: {
        en: "No credit card required",
        pl: "Karta kredytowa nie jest wymagana",
        fr: "Pas de carte de crédit nécessaire",
      },
    },
  },
  WelcomePage: {
    welcomeText: {
      en: "Welcome to Inbudget",
      pl: "Witaj w Inbudget",
      fr: "Bienvenue sur Inbudget",
    },
  },
  MainPage: {
    welcomeText: {
      en: "Welcome to Inbudget",
      pl: "Witaj w Inbudget",
      fr: "Bienvenue sur Inbudget",
    },
    createAccountLink: {
      en: "Create my free account!",
      pl: "Utwórz bezpłatne konto!",
      fr: "Créer un compte gratuit !",
    },
  },
  SignInPage: {
    form: {
      errorMessage: {
        en: "Invalid credentials. Please try again.",
        pl: "Nieprawidłowy email lub hasło. Proszę spróbuj ponownie.",
        fr: "Email ou mot de passe invalide. Veuillez réessayer.",
      },
      emailInput: {
        label: { en: "Email", pl: "Email", fr: "Email" },
        wrongFormatError: {
          en: "This is not a valid email",
          pl: "To nie jest prawidłowy adres email",
          fr: "Cette adresse email n'est pas valide",
        },
      },
      passwordInput: {
        label: { en: "Password", pl: "Hasło", fr: "Mot de passe" },
        min3CharactersError: {
          en: "Password must have at least 3 characters",
          pl: "Hasło musi mieć co najmniej 3 znaki",
          fr: "Le mot de passe doit contenir au moins 3 caractères",
        },
      },
      submitButton: { en: "Log In", pl: "Zaloguj", fr: "Se connecter" },
    },
  },
  SignUpPage: {
    passwordComponent: {
      mainHeader: {
        en: "Let's secure the account",
        pl: "Zabezpieczmy konto",
        fr: "Sécurisons le compte",
      },
      subHeader: {
        en: "Use password to protect your account",
        pl: "Użyj hasła, aby zabezpieczyć konto",
        fr: "Utilisez un mot de passe pour sécuriser votre compte",
      },
      requirementsHeader: {
        en: "Your password must contain at least:",
        pl: "Twoje hasło musi zawierać przynajmniej:",
        fr: "Votre mot de passe doit contenir au moins :",
      },
      requirementUpperCase: {
        en: "One upper case character",
        pl: "Jedną wielką literę",
        fr: "Une lettre majuscule",
      },
      requirementLowerCase: {
        en: "One lower case character",
        pl: "Jedną małą literę",
        fr: "Une lettre minuscule",
      },
      requirementSpecialCharacter: {
        en: "One special character",
        pl: "Jeden znak specjalny",
        fr: "Un caractère spécial",
      },
      requirementNoSpace: {
        en: "No spaces",
        pl: "Nie może zawierać spacji",
        fr: "Il ne peut pas contenir d'espaces",
      },
      requirementLength: {
        en: "12 characters or more",
        pl: "Musi składać się z 12 lub więcej znaków",
        fr: "Il doit contenir 12 caractères ou plus",
      },
      inputPlaceholderPassword: {
        en: "Password",
        pl: "Hasło",
        fr: "Mot de passe",
      },
      inputPlaceholderRepeatPassword: {
        en: "Repeat password",
        pl: "Powtórz hasło",
        fr: "Répétez le mot de passe",
      },
      buttonBack: {
        en: "Back",
        pl: "Powrót",
        fr: "Retour",
      },
      buttonNext: {
        en: "Continue",
        pl: "Dalej",
        fr: "Continuer",
      },
      inputErrors: {
        missingUpperCase: {
          en: "The password should contain at least one upper case character",
          pl: "Hasło powinno zawierać przynajmniej jedną wielką literę",
          fr: "Le mot de passe doit contenir au moins une lettre majuscule",
        },
        missingLowerCase: {
          en: "The password should contain at least one lower case character",
          pl: "Hasło powinno zawierać przynajmniej jedną małą literę",
          fr: "Le mot de passe doit contenir au moins une lettre minuscule",
        },
        missingSpecialCharacter: {
          en: "The password should contain at least one special character",
          pl: "Hasło powinno zawierac przynajmniej jeden znak specjalny",
          fr: "Le mot de passe doit contenir au moins un caractère spécial",
        },
        spacesCheck: {
          en: "The password should not contain spaces",
          pl: "Hasło nie powinno zawierać spacji",
          fr: "Le mot de passe ne doit pas contenir d'espaces",
        },
        longCheck: {
          en: "The password should be at least 12 characters long",
          pl: "Hasło powinno zawierać przynajmniej 12 znaków",
          fr: "Le mot de passe doit contenir au moins 12 caractères",
        },
        matchError: {
          en: "Passwords do not match",
          pl: "Podane hasła różnią się od siebie",
          fr: "Les mots de passe ne correspondent pas",
        },
      },
    },
    paragraph: {
      en: "Hello from Sign-Up page",
      pl: "Witaj ze strony rejestracji",
      fr: "Bienvenue sur la page d'inscription",
    },
    profileScreen: {
      title: {
        en: "Customise the account",
        pl: "Spersonalizuj swoje konto",
        fr: "Personnaliser votre compte",
      },
      subtitle: {
        en: "Select your avatar and tell us your name",
        pl: "Wybierz avatar i powiedz jak się nazywasz",
        fr: "Choisissez un avatar et dites votre nom",
      },
      firstNameInputLabel: {
        en: "First name",
        pl: "Imię",
        fr: "Nom",
      },
      lastNameInputLabel: {
        en: "Last name",
        pl: "Nazwisko",
        fr: "Prénom",
      },
      inputErrorMsg: {
        en: "The field cannot be empty",
        pl: "Pole nie może być puste",
        fr: "Le champ ne peut pas être vide",
      },
      backButton: {
        en: "Back",
        pl: "Powrót",
        fr: "Retour",
      },
      submitButton: {
        en: "Create account",
        pl: "Utwórz konto",
        fr: "Créer un compte",
      },
    },
    emailScreen: {
      inputLabel: {
        en: "Email",
        pl: "Email",
        fr: "Email",
      },
      invalidEmailError: {
        en: "This is not a valid email",
        pl: "To nie jest prawidłowy adres email",
        fr: "Cette adresse email n'est pas valide",
      },
      buttonNext: {
        en: "Continue",
        pl: "Dalej",
        fr: "Continuer",
      },
      footer: {
        en: "Already have an account?",
        pl: "Posiadasz już konto?",
        fr: "Avez vous déjà un compte ?",
      },
      footerLink: {
        en: "Log in",
        pl: "Zaloguj się",
        fr: "Connectez-vous",
      },
    },
    successErrorScreen: {
      status: {
        error: {
          subheader: {
            en: "The account with this email already exists",
            pl: "Konto z tym adresem e-mail już istnieje",
            fr: "Un compte avec cette adresse email existe déjà",
          },
          header: {
            en: "Something went wrong",
            pl: "Coś poszło nie tak",
            fr: "Quelque chose a mal tourné",
          },
          button: {
            en: "Back to the registration process",
            pl: "Powrót do rejestracji",
            fr: "Retour à l'inscription",
          },
        },
        success: {
          subheader: {
            en: "You've successfully created your account",
            pl: "Pomyślnie utworzyłeś swoje konto",
            fr: "Vous avez créé votre compte avec succès",
          },
          header: {
            en: "Congratulations",
            pl: "Gratulacje",
            fr: "Félicitations",
          },
          button: {
            en: "Log in to your account",
            pl: "Zaloguj się",
            fr: "Se connecter",
          },
        },
      },
    },
  },
  AddNewBudgetModal: {
    title: {
      en: "New budget",
      pl: "Nowy budżet",
      fr: "Nouveau budget",
    },
    tabs: {
      settings: {
        en: "Settings",
        pl: "Ustawiena",
        fr: "Paramètres",
      },
      share: {
        en: "Share",
        pl: "Udostępnij",
        fr: "Partager",
      },
    },
    paragraphs: {
      details: {
        en: "Details",
        pl: "Szczegóły",
        fr: "Détails",
      },
      budgetPeriod: {
        en: "Budget period",
        pl: "Data ważności budżetu",
        fr: "Date d'expiration du budget",
      },
      wordIt: {
        en: "to",
        pl: "do",
        fr: "à",
      },
    },
    button: {
      en: "Save",
      pl: "Zapisz",
      fr: "Enregistrer",
    },
    inputNames: {
      budgetName: {
        en: "Budget name",
        pl: "Nazwa budżetu",
        fr: "Nom du budget",
      },
      budgetLimit: {
        en: "Budget limit",
        pl: "Limit budżetu",
        fr: "Limite du budget",
      },
      currency: {
        en: "Currency",
        pl: "Waluta",
        fr: "Monnaie",
      },
      description: {
        en: "Description",
        pl: "Opis",
        fr: "Description",
      },
      dateStart: {
        en: "Start date",
        pl: "Data początkowa",
        fr: "Date de début",
      },
      dateEnd: {
        en: "End date",
        pl: "Data końcowa",
        fr: "Date de fin",
      },
    },
    errors: {
      min3characters: {
        en: "Budget name must have at least 3 characters.",
        pl: "Nazwa musi mieć conajmniej 3 znaki.",
        fr: "Le nom doit contenir au moins 3 caractères.",
      },
      max30characters: {
        en: "Budget must not have more than 30 characters.",
        pl: "Nazwa nie może mieć więcej niż 30 znaków.",
        fr: "Le nom ne peut pas dépasser 30 caractères.",
      },
      max50characters: {
        en: "Character limit of 50 reached.",
        pl: "Limit znaków osiągnięty (50).",
        fr: "Limite de caractères a été atteint (50).",
      },
      nameTaken: {
        en: "Name is taken, please choose another.",
        pl: "Nazwa zajęta. Proszę wybierz inną.",
        fr: "Le nom est déjà pris, veuillez en choisir un autre.",
      },
      moreThanZero: {
        en: "Must be grater than 0.",
        pl: "Powinien być większy niż 0.",
        fr: "Il doit être supérieur à 0.",
      },
      specifyBudgetLimit: {
        en: "Please specify budget limit.",
        pl: "Podaj limit budżetu.",
        fr: "Veuillez spécifier la limite du budget.",
      },
      cantBeEmpty: {
        en: "Not selected.",
        pl: "Nie wybrano.",
        fr: "Non séléctionné.",
      },
      dateBeforeStart: {
        en: "Must be after start date.",
        pl: "Podaj datę późniejszą.",
        fr: "Entrez une date ultérieure.",
      },
    },
  },
  BudgetsPage: {
    title: { en: "Budgets page", pl: "Budżety", fr: "Budgets" },
    dropdownButtonAriaLabel: {
      en: "More options",
      pl: "Więcej opcji",
      fr: "Plus d'options",
    },
    basicInformation: {
      labels: {
        period: {
          en: "Budget period",
          pl: "Okres trwania",
          fr: "Période du budget",
        },
        limit: {
          en: "Budget limit",
          pl: "Limit budżetu",
          fr: "Limite du budget",
        },
        currency: { en: "Currency", pl: "Waluta", fr: "Monnaie" },
      },
      currencyNames: {
        USD: {
          en: "United States Dollar",
          pl: "Dolar Amerykański",
          fr: "Dollar des États-Unis",
        },
        PLN: { en: "Polish Zloty", pl: "Polski Złoty", fr: "Zloty polonais" },
        GBP: {
          en: "British Pound",
          pl: "Funt Brytyjski",
          fr: "Livre britannique",
        },
        EUR: { en: "Euro", pl: "Euro", fr: "Euro" },
      },
      dateFormats: { en: "en-GB", pl: "pl", fr: "fr-FR" },
    },
    createButton: {
      label: { en: "Create", pl: "Utwórz", fr: "Créer"},
      newIncome: { en: "New income", pl: "Nowy wpływ", fr: "Nouveaux revenus"},
      newExpense: { en: "New expense", pl: "Nowy wydatek", fr: "Nouvelle dépense"},
    },
    transactionsTable: {
      groupRowDays: {
        yesterday: { en: "Yesterday", pl: "Wczoraj", fr: "Hier" },
        today: { en: "Today", pl: "Dzisiaj", fr: "Aujourd'hui" },
        monday: { en: "Monday", pl: "Poniedziałek", fr: "Lundi" },
        tuesday: { en: "Tuesday", pl: "Wtorek", fr: "Mardi" },
        wednesday: { en: "Wednesday", pl: "Środa", fr: "Mercredi" },
        thursday: { en: "Thursday", pl: "Czwartek", fr: "Jeudi" },
        friday: { en: "Friday", pl: "Piątek", fr: "Vendredi" },
        saturday: { en: "Saturday", pl: "Sobota", fr: "Samedi" },
        sunday: { en: "Sunday", pl: "Niedziela", fr: "Dimanche" },
      },
      tableColumnHeaders: {
        category: { en: "Category", pl: "Kategoria", fr: "Catégorie" },
        name: { en: "Name", pl: "Nazwa", fr: "Nom" },
        amount: { en: "Amount", pl: "Kwota", fr: "Montant" },
        creator: { en: "Creator", pl: "Twórca", fr: "Créateur" },
      },
    },
  },
  ReportsPage: { title: { en: "Reports page", pl: "Raporty", fr: "Rapports" } },
  SettingsPage: {
    title: { en: "Settings page", pl: "Ustawienia", fr: "Paramètres" },
  },
  TeamPage: { title: { en: "Team page", pl: "Zespoły", fr: "Équipes" } },
};

export default dictionary;

export type dictionaryType = typeof dictionary;
