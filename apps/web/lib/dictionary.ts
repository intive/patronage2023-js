const dictionary = {
  Common: {
    days: {
      yesterday: { en: "Yesterday", pl: "wczoraj", fr: "hier" },
      today: { en: "Today", pl: "dzisiaj", fr: "aujourd'hui" },
    },
  },
  NavigationLayout: {
    languageFlagAlts: {
      polishFlag: {
        en: "flag of Poland",
        pl: "flaga Polski",
        fr: "drapeau de la Pologne",
      },
      britishFlag: {
        en: "flag of United Kingdom",
        pl: "flaga Wielkiej Brytanii",
        fr: "drapeau du Royaume-Uni",
      },
      frenchFlag: {
        en: "flag of France",
        pl: "flaga Francji",
        fr: "drapeau de la France",
      },
    },
    burgerMenuLabel: {
      en: "Open menu",
      pl: "Otwórz menu",
      fr: "Ouvrir le menu",
    },
    SideNav: {
      budgetsItem: {
        title: { en: "Budgets", pl: "Budżety", fr: "Budgets" },
        searchInputPlaceholder: {
          en: "Search budget",
          pl: "Wyszukaj budżet",
          fr: "Rechercher un budget",
        },
        buttonLabel: {
          en: "New budget",
          pl: "Nowy budżet",
          fr: "Nouveau budget",
        },
        importButtonLabel: {
          en: "Import",
          pl: "Importuj",
          fr: "Importer",
        },
        exportButtonLabel: {
          en: "Export file",
          pl: "Eksportuj plik",
          fr: "Exporter le fichier",
        },
        infos: {
          loading: {
            en: "Loading...",
            pl: "Ładowanie...",
            fr: "Chargement ...",
          },
          error: {
            en: "Something went wrong",
            pl: "Coś poszło nie tak",
            fr: "Quelque chose a mal tourné",
          },
          text: {
            en: "There are no budgets with specified name.",
            pl: "Nie ma budżetów o wskazanej nazwie.",
            fr: "Il n'y a aucun budget avec le nom spécifié",
          },
          noDataInBudgets: {
            en: "You have not created any budgets yet.",
            pl: "Nie stworzyłeś jeszcze żadnych budżetów.",
            fr: "Vous n'avez pas encore créé de budget.",
          },
        },
      },
      reportsItem: {
        title: { en: "Reports", pl: "Raporty", fr: "Rapports" },
      },
      settingsItem: {
        title: { en: "Settings", pl: "Ustawienia", fr: "Paramètres" },
        settingsItems: {
          editProfile: {
            en: "Edit profile",
            pl: "Edytuj profil",
            fr: "Modifier le profil",
          },
          changePassword: {
            en: "Change password",
            pl: "Zmień hasło",
            fr: "Changer le mot de passe",
          },
          language: {
            en: "Language",
            pl: "Język",
            fr: "Langue",
          },
          currency: {
            en: "Currency",
            pl: "Waluta",
            fr: "Monnaie",
          },
        },
      },
      usersItem: {
        title: { en: "Users", pl: "Użytkownicy", fr: "Utilisateurs" },
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
    signIn: {
      en: "Sign in",
      pl: "Zaloguj",
      fr: "Se connecter",
    },
    logOut: {
      en: "Log out",
      pl: "Wyloguj",
      fr: "Se déconnecter",
    },
    signOut: {
      en: "Sign out",
      pl: "Wyloguj",
      fr: "Se déconnecter",
    },
    home: {
      en: "Home",
      pl: "Strona główna",
      fr: "Page d'accueil",
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
      footer: {
        en: "Don't have an account?",
        pl: "Nie posiadasz konta?",
        fr: "N'avez-vous pas de compte ?",
      },
      footerLink: {
        en: "Sign up",
        pl: "Zarejestruj się",
        fr: "Inscrivez-vous",
      },
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
      avatarSwitcherDefault: {
        en: "Default",
        pl: "Podstawowe",
        fr: "Par défaut",
      },
      avatarSwitcherCustom: {
        en: "Personalized",
        pl: "Spersonalizowany",
        fr: "Personnalisé",
      },
      dropZone: {
        mainText: {
          en: "Drop file here",
          pl: "Upuść plik tutaj",
          fr: "Déposez le fichier ici",
        },
        separator: {
          en: "or",
          pl: "lub",
          fr: "ou",
        },
        buttonText: {
          en: "Choose a file",
          pl: "Wybierz plik",
          fr: "Choisir un fichier",
        },
        onOver: {
          en: "Drop here...",
          pl: "Upuść tutaj...",
          fr: "Déposez ici...",
        },
        goBack: {
          en: "Crop again",
          pl: "Przytnij jeszcze raz",
          fr: "Recadrer à nouveau",
        },
        delete: {
          en: "Delete",
          pl: "Usuń",
          fr: "Supprimer",
        },
        modalHeader: {
          en: "Crop your image before submitting.",
          pl: "Przytnij zdjęcie przed wysłaniem.",
          fr: "Recadrez votre image avant de la soumettre.",
        },
        croppedTitle: {
          en: "Your avatar",
          pl: "Twój awatar",
          fr: "Votre avatar",
        },
      },
      subtitle: {
        en: "Select or upload your avatar and tell us your name",
        pl: "Wybierz lub prześlij swój avatar i powiedz jak się nazywasz",
        fr: "Choisissez ou téléchargez votre avatar et prononcez votre nom",
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
  FavouriteBudget: {
    favourite: {
      en: "Add to favourites",
      pl: "Dodaj do ulubionych",
      fr: "Ajouter aux favoris",
    },
    unfavourite: {
      en: "Remove from favourites",
      pl: "Usuń z ulubionych",
      fr: "Supprimer des favoris",
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
      startDate: {
        en: "Start date",
        pl: "Data początkowa",
        fr: "Date de début",
      },
      endDate: {
        en: "End date",
        pl: "Data końcowa",
        fr: "Date de fin",
      },
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
    errors: {
      min3characters: {
        en: "Budget name must have at least 3 characters.",
        pl: "Nazwa musi mieć conajmniej 3 znaki.",
        fr: "Le nom doit contenir au moins 3 caractères.",
      },
      max30characters: {
        en: "Budget name must not have more than 30 characters.",
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
      error400: {
        en: "Oops, something went wrong",
        pl: "Ups, coś poszło nie tak.",
        fr: "Oups, quelque chose a mal tourné.",
      },
      error401: {
        en: "Please log in or register to continue.",
        pl: "Zaloguj się lub zarejestruj, aby kontynuować.",
        fr: "Veuillez vous connecter ou vous inscrire pour continuer.",
      },
      errorDefault: {
        en: "An unexpected error occurred.",
        pl: "Wystąpił nieoczekiwany błąd.",
        fr: "Une erreur inattendue est apparue.",
      },
    },
  },
  EditBudgetModal: {
    title: {
      en: "Edit budget",
      pl: "Edytuj budżet",
      fr: "Éditer budget",
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
      description: {
        en: "Description",
        pl: "Opis",
        fr: "Description",
      },
      startDate: {
        en: "Start date",
        pl: "Data początkowa",
        fr: "Date de début",
      },
      endDate: {
        en: "End date",
        pl: "Data końcowa",
        fr: "Date de fin",
      },
    },
    errors: {
      min3characters: {
        en: "Budget name must have at least 3 characters.",
        pl: "Nazwa musi zawierać co najmniej 3 znaki.",
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
      error400: {
        en: "Wrong data.",
        pl: "Niewłaściwe dane.",
        fr: "Données incorrectes",
      },
      error401: {
        en: "No authorization!",
        pl: "Brak autoryzacji!",
        fr: "Absence d'autorisation!",
      },
      errorDefault: {
        en: "Oops, something went wrong.",
        pl: "Ups, coś poszło nie tak.",
        fr: "Oups, quelque chose a mal tourné.",
      },
    },
  },
  ShareBudget: {
    header: {
      en: "Share budget",
      pl: "Udostępnij budżet",
      fr: "Partager le budget",
    },
    noUsersFound: {
      en: "No members found.",
      pl: "Nie znaleziono użytkowników.",
      fr: "D'aucuns utilisateurs trouvés",
    },
    inviteMembers: {
      en: "Invite existing members",
      pl: "Zaproś użytkowników",
      fr: "Inviter des utilisateurs existants",
    },
    search: { en: "Search", pl: "Wyszukaj", fr: "Rechercher" },
    save: { en: "Save", pl: "Zapisz", fr: "Enregistrer" },
    errors: {
      error400: {
        en: "400: Incorrect data. Please try again.",
        pl: "400: Nieprawidłowe dane. Spróbuj jeszcze raz.",
        fr: "400: Données incorrectes. Veuillez réessayer.",
      },
      error401: {
        en: "401: Unauthorized user",
        pl: "401: Nieautoryzowany użytkownik",
        fr: "401: L'utilisateur non autorisé",
      },
      errorDefault: {
        en: "Oops, something went wrong.",
        pl: "Ups, coś poszło nie tak.",
        fr: "Oups, quelque chose a mal tourné.",
      },
    },
  },
  CreateNewTransactionModal: {
    header: {
      income: {
        en: "New income",
        pl: "Nowy wpływ",
        fr: "Nouvelle recette",
      },
      expense: {
        en: "New expense",
        pl: "Nowy wydatek",
        fr: "Nouvelle dépense",
      },
    },
    details: {
      en: "Details",
      pl: "Szczegóły",
      fr: "Détails",
    },
    nameLabel: {
      income: {
        en: "Income name",
        pl: "Nazwa wpływu",
        fr: "Nom de la recette",
      },
      expense: {
        en: "Expense name",
        pl: "Nazwa wydatku",
        fr: "Nom de la dépense",
      },
    },
    amountLabel: {
      en: "Amount",
      pl: "Kwota",
      fr: "Le montant",
    },
    categoryLabel: {
      en: "Category",
      pl: "Kategoria",
      fr: "Catégorie",
    },
    dateLabel: {
      en: "Due date",
      pl: "Termin",
      fr: "Date d'échéance",
    },
    button: {
      en: "Save",
      pl: "Zapisz",
      fr: "Enregistrer",
    },
    errors: {
      min3characters: {
        en: "Name must have at least 3 characters.",
        pl: "Nazwa musi zawierać co najmniej 3 znaki.",
        fr: "Le nom doit contenir au moins 3 caractères.",
      },
      max58characters: {
        en: "Name must not have more than 58 characters.",
        pl: "Nazwa nie może mieć więcej niż 58 znaków.",
        fr: "Le nom ne peut pas dépasser 58 caractères.",
      },
      amountGraterThanZero: {
        en: "Amount must be grater than 0.",
        pl: "Kwota musi być większa od 0.",
        fr: "Le montant doit être supérieur à 0.",
      },
      amountNotEmpty: {
        en: "Please specify the amount.",
        pl: "Podaj kwotę transakcji.",
        fr: "Veuillez préciser le montant.",
      },
      selectCategory: {
        en: "Please select a category.",
        pl: "Wybierz kategorię.",
        fr: "Veuillez sélectionner une catégorie.",
      },
      selectDate: {
        en: "Please select a date.",
        pl: "Wybierz datę.",
        fr: "Veuillez sélectionner une date.",
      },
      dateNotInStartEndRange: {
        en: "The date must be within the budget period",
        pl: "Data musi się mieścić w okresie trwania budżetu",
        fr: "La date doit être comprise dans la période du budget",
      },
    },
    responseErrors: {
      400: {
        en: "400: Incorrect data. Please try again.",
        pl: "400: Nieprawidłowe dane. Spróbuj jeszcze raz.",
        fr: "400: Données incorrectes. Veuillez réessayer.",
      },
      401: {
        en: "401: Unauthorized user",
        pl: "401: Nieautoryzowany użytkownik",
        fr: "401: L'utilisateur non autorisé",
      },
      default: {
        en: "Adding transaction failed. Please try again.",
        pl: "Dodawanie transakcji nie powiodło się. Spróbuj ponownie.",
        fr: "L'ajout de la transaction a échoué. Veuillez réessayer.",
      },
    },
  },
  BudgetsPage: {
    title: { en: "Budgets page", pl: "Budżety", fr: "Budgets" },
    tableError: {
      en: "An error occured, close this window to try again",
      pl: "Wystąpił błąd, zamknij to okno, aby spróbować ponownie",
      fr: "Une erreur s'est produite, veuillez fermer cette fenêtre pour réessayer",
    },
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
        dropdownMenuAriaLabel: {
          en: "More options",
          pl: "Więcej opcji",
          fr: "Plus d'options",
        },
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
    removeBudgetModal: {
      header: {
        en: "Are you sure you want to delete the budget:",
        pl: "Czy na pewno chcesz usunąć ten budżet:",
        fr: "Êtes-vous sûr de vouloir supprimer ce budget:",
      },
      confirmButton: {
        en: "Confirm",
        pl: "Potwierdź",
        fr: "Confirmer",
      },
      abortButton: {
        en: "Cancel",
        pl: "Anuluj",
        fr: "Annuler",
      },
      errorMessage: {
        en: "Ops, something went wrong",
        pl: "Ups, coś poszło nie tak",
        fr: "Oups, quelque chose a mal tourné",
      },
      confirmMessage: {
        en: "Budget was successfully removed",
        pl: "Budżet został pomyślnie usunięty",
        fr: "Le budget a été supprimé correctement",
      },
    },
    createButton: {
      label: { en: "Create", pl: "Utwórz", fr: "Créer" },
      newIncome: { en: "New income", pl: "Nowy wpływ", fr: "Nouvelle recette" },
      newExpense: {
        en: "New expense",
        pl: "Nowy wydatek",
        fr: "Nouvelle dépense",
      },
    },

    charts: {
      titleLeft: {
        en: "Total balance",
        pl: "Bilans",
        fr: "Solde total",
      },
    },
    buttonGroupLabels: {
      all: { en: "View all", pl: "Wszystkie", fr: "Voir tout" },
      income: { en: "Incomes", pl: "Wpływy", fr: "Les recettes" },
      expenses: { en: "Expenses", pl: "Wydatki", fr: "Les dépenses" },
    },
    searchInputTransactionPlaceholder: {
      en: "Search by Name",
      pl: "Wyszukaj po nazwie",
      fr: "Rechercher par nom",
    },
    transactionsTable: {
      tableColumnHeaders: {
        category: { en: "Category", pl: "Kategoria", fr: "Catégorie" },
        name: { en: "Name", pl: "Nazwa", fr: "Nom" },
        amount: { en: "Amount", pl: "Kwota", fr: "Montant" },
        creator: { en: "Creator", pl: "Twórca", fr: "Créateur" },
      },
      threeDotsComponentNames: {
        edit: { en: "Edit", pl: "Edytuj", fr: "Modifier" },
        clone: { en: "Clone", pl: "Klonuj", fr: "Cloner" },
        remove: { en: "Remove", pl: "Usuń", fr: "Supprimer" },
      },
    },
  },
  ReportsPage: {
    title: { en: "Reports", pl: "Raporty", fr: "Rapports" },
    aside: {
      title: {
        en: "Additional information",
        pl: "Dodatkowe informacje",
        fr: "Informations supplémentaires",
      },
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
    currencyPlShorts: {
      en: "PLN",
      pl: "zł",
      fr: "PLN",
    },
    thousandShorts: {
      en: "K",
      pl: "tys",
      fr: "k",
    },
    balance: {
      en: "Total balance",
      pl: "Bilans",
      fr: "Solde total",
    },
    trendChip: {
      text: {
        en: "Your budget's percentage growth is ",
        pl: "Wzrost procentowy twojego budżetu wynosi ",
        fr: "Le pourcentage de croissance de votre budget est de ",
      },
    },
    currency: {
      en: "Currency",
      pl: "Waluta",
      fr: "Monnaie",
    },
    shortcuts: {
      day: {
        en: "d",
        pl: "d",
        fr: "j",
      },
      month: {
        en: "m",
        pl: "m",
        fr: "m",
      },
    },
    info: {
      noData: {
        en: "No data for ",
        pl: "Brak danych dla ",
        fr: "Aucune donnée pour ",
      },
      noTransaction: {
        en: "There are no transactions for the selected period",
        pl: "Brak transakcji dla wybranego okresu",
        fr: "Il n'y a aucune transaction pour la période sélectionnée",
      },
    },
    labelsTooltip: {
      incomes: {
        en: "Incomes",
        pl: "Wpływy",
        fr: "Recettes",
      },
      expenses: {
        en: "Expenses",
        pl: "Wydatki",
        fr: "Dépenses",
      },
    },
  },
  SettingsPage: {
    title: { en: "Settings page", pl: "Ustawienia", fr: "Paramètres" },
    editProfile: {
      title: {
        en: "Edit profile",
        pl: "Edytuj profil",
        fr: "Modifier le profil",
      },
    },
    changePassword: {
      title: {
        en: "Change password",
        pl: "Zmień hasło",
        fr: "Changer le mot de passe",
      },
    },
    language: {
      title: {
        en: "Language",
        pl: "Język",
        fr: "Langue",
      },
    },
    currency: {
      title: {
        en: "Currency",
        pl: "Waluta",
        fr: "Monnaie",
      },
      button: {
        en: "Save changes",
        pl: "Zapisz zmianę",
        fr: "Enregistrer",
      },
      toast: {
        en: "Saved",
        pl: "Zapisano",
        fr: "Enregistré",
      },
    },
  },
  TeamPage: { title: { en: "Team page", pl: "Zespoły", fr: "Équipes" } },
  Pagination: {
    pageAriaLabel: {
      en: "Page",
      pl: "Strona",
      fr: "Page",
    },
    currentPageAriaLabel: {
      en: "is your current page",
      pl: "to twoja bieżąca strona",
      fr: "votre page actuelle",
    },
    nextPageAriaLabel: {
      en: "Next page",
      pl: "Następna strona",
      fr: "Page suivante",
    },
    previousPageAriaLabel: {
      en: "Previous page",
      pl: "Poprzednia strona",
      fr: "Page précédente",
    },
    rowsPerPageText: {
      en: "Rows per page",
      pl: "Wierszy na stronie",
      fr: "Lignes par page",
    },
    breakElementAriaLabel: {
      en: "Jump 3 pages ahead",
      pl: "Skocz 3 strony do przodu",
      fr: "Aller de 3 pages en avant",
    },
    navigationTableAriaLabel: {
      en: "Table navigation",
      pl: "Nawigacja po tabeli",
      fr: "Navigation dans le tableau",
    },
    rowsPerPageSelectAriaLabel: {
      en: "Selection of the number of transactions displayed on the page",
      pl: "Wybór liczby transakcji wyświetlanych na stronie",
      fr: "Sélection du nombre de transactions affichées sur la page",
    },
  },
  BudgetStatistics: {
    queryButtonLabels: {
      week: {
        en: "This week",
        pl: "Ten Tydzień",
        fr: "Cette semaine",
      },
      month: {
        en: "This month",
        pl: "Ten miesiąc",
        fr: "Ce mois-ci",
      },
      quarter: {
        en: "Within 3 months",
        pl: "W ciągu 3 miesiący",
        fr: "Dans les 3 mois",
      },
    },
    title: {
      week: {
        en: "Budget this week",
        pl: "Budżet w tym tygodniu",
        fr: "Budget cette semaine",
      },
      month: {
        en: "Budget this month",
        pl: "Budżet w tym miesiącu",
        fr: "Budget ce mois-ci",
      },
      quarter: {
        en: "Budget within 3 months",
        pl: "Budżet z ostatnich 3 miesięcy",
        fr: "Budget sous 3 mois",
      },
    },
  },
  UsersPage: {
    title: {
      en: "Users",
      pl: "Użytkownicy",
      fr: "Utilisateurs",
    },
    aside: {
      title: {
        en: "User information",
        pl: "Informacje o użytkowniku",
        fr: "Information de l'utilisateur",
      },
    },
    usersTable: {
      firstName: {
        en: "First name",
        pl: "Imię",
        fr: "Nom",
      },
      lastName: {
        en: "Last name",
        pl: "Nazwisko",
        fr: "Prénom",
      },
      email: {
        en: "Email",
        pl: "Email",
        fr: "Email",
      },
      dateCreated: {
        en: "Date created",
        pl: "Utworzono",
        fr: "Date créée",
      },
      noDataFound: {
        en: "No data found",
        pl: "Brak danych",
        fr: "Aucune donnée disponible",
      },
    },
  },
  AsideCard: {
    categories: {
      title: {
        en: "Categories",
        pl: "Kategorie",
        fr: "Catégories",
      },
      settings: {
        en: "Manage",
        pl: "Zarządzaj",
        fr: "Gérer",
      },
    },
  },
  CategoryMap: {
    homeSpendings: {
      en: "Home spendings",
      pl: "Wydatki domowe",
      fr: "Dépenses à domicile",
    },
    subscriptions: {
      en: "Subscriptions",
      pl: "Subskrypcje",
      fr: "Abonnements",
    },
    car: {
      en: "Car",
      pl: "Samochód",
      fr: "Voiture",
    },
    grocery: {
      en: "Grocery",
      pl: "Zakupy spożywcze",
      fr: "Épicerie",
    },
    salary: {
      en: "Salary",
      pl: "Wynagrodzenie",
      fr: "Salaire",
    },
    refund: {
      en: "Refund",
      pl: "Zwrot kosztów",
      fr: "Remboursement",
    },
  },
  ImportExportMainButton: {
    import: {
      en: "Import",
      pl: "Importuj",
      fr: "Importer",
    },
    export: {
      en: "Export",
      pl: "Eksportuj",
      fr: "Exporter",
    },
  },
  ExportFile: {
    exportToastMessage: {
      en: "CSV exported successfully",
      pl: "CSV wyeksportowany pomyślnie",
      fr: "CSV exporté avec succès",
    },
    exportButtonText: {
      en: "Download CSV",
      pl: "Pobierz plik CSV",
      fr: "Télécharger le fichier CSV",
    },
    sendEmailText: {
      en: "Send by email",
      pl: "Wyślij za pomocą email",
      fr: "Envoyer par email",
    },
    toastMessages: {
      emailSent: {
        en: "Email sent.",
        pl: "Email wysłany.",
        fr: "Email envoyé.",
      },
    },
  },
  ImportModal: {
    downloadButtonText: {
      en: "Download CSV",
      pl: "Pobierz plik CSV",
      fr: "Télécharger le fichier CSV",
    },
    successHeader: {
      en: "Congratulations",
      pl: "Gratulacje",
      fr: "Félicitations",
    },
    successSubHeader: {
      en: "Your file has been successfully imported!",
      pl: "Plik został pomyślnie zaimportowany!",
      fr: "Le fichier a été importé avec succès !",
    },
    corruptedFile: {
      en: "Check the file, it may be corrupted!",
      pl: "Sprawdź plik, może być uszkodzony!",
      fr: "Vérifiez le fichier, il est peut-être corrompu !",
    },
    errorCsvMessage: {
      en: "Not all records have been imported. Check which records have not been imported! Correct the records in the downloaded file and import them again.",
      pl: "Nie wszystkie rekordy zostały zaimportowane. Sprawdź, które rekordy nie zostały zaimportowane! Popraw rekordy w pobranym pliku i zaimportuj je ponownie.",
      fr: "Certains enregistrements n'ont pas été importés. Veuillez vérifier quels enregistrements n'ont pas été importés ! Corrigez les enregistrements dans le fichier téléchargé et importez-les à nouveau.",
    },
    noBudgetSaved: {
      en: "No budget was saved. Correct the file and import it again",
      pl: "Żaden budżet nie został zapisany. Popraw plik i zaimportuj go ponownie",
      fr: "Aucun budget n'a été enregistré. Corrigez le fichier et importez-le à nouveau",
    },
    noTransactionSaved: {
      en: "No transaction was saved. Correct the file and import it again",
      pl: "Żadna transakcja nie została zapisana. Popraw plik i zaimportuj go ponownie",
      fr: "Aucune transaction n'a été enregistré. Corrigez le fichier et importez-le à nouveau",
    },
    incorrectFileExtension: {
      en: "Incorrect file extension. Import the file with the correct extension:",
      pl: "Nieprawidłowe rozszerzenie pliku. Zaimportuj plik z prawidłowym rozszerzeniem:",
      fr: "Extension de fichier incorrecte. Importez le fichier avec l'extension correcte:",
    },
    responseErrors: {
      400: {
        en: "400: Incorrect data. Correct the file and try again.",
        pl: "400: Nieprawidłowe dane. Popraw plik i spróbuj jeszcze raz.",
        fr: "400: Données incorrectes. Corrigez le fichier et réessayez.",
      },
      401: {
        en: "401: Unauthorized user",
        pl: "401: Nieautoryzowany użytkownik",
        fr: "401: Utilisateur non autorisé",
      },
      default: {
        en: "Oops, something went wrong.",
        pl: "Ups, coś poszło nie tak.",
        fr: "Oups, quelque chose a mal tourné.",
      },
    },
    modalHeader: {
      en: "Import",
      pl: "Importuj",
      fr: "Importer",
    },
    importButtonText: {
      en: "Click to import",
      pl: "Kliknij, aby zaimportować",
      fr: "Cliquer pour importer",
    },
    instruction: {
      wantToUpload: {
        en: "If you want to upload a file, please click the button below.",
        pl: "Jeśli chcesz załadować plik, proszę kliknij przycisk poniżej.",
        fr: "Si vous souhaitez charger un fichier, veuillez cliquer sur le bouton ci-dessous.",
      },
      correctFile: {
        en: "The correct file should have a .csv extension. The CSV file should have headers on the ",
        pl: "Prawidłowy plik powinien mieć rozszerzenie .csv. Plik CSV powinien zawierać nagłówki w ",
        fr: "Le fichier correct doit avoir une extension .csv. Le fichier CSV doit avoir des en-têtes sur la ",
      },
      HLFirstLine: {
        en: "first line",
        pl: "pierwszej linii",
        fr: "première ligne",
      },
      subsequentLines: {
        en: ". Subsequent lines should contain the",
        pl: ". Kolejne linie powinny zawierać",
        fr: ". Les lignes suivantes doivent contenir les",
      },
      HLCorrectData: {
        en: " correct data ",
        pl: " poprawne dane ",
        fr: " données correctes ",
      },
      eachLine: {
        en: "on each line.",
        pl: "w każdej linii.",
        fr: "sur chaque ligne.",
      },
      example: {
        en: "Example below:",
        pl: "Przykład poniżej:",
        fr: "Exemple ci-dessous :",
      },
      useComas: {
        en: "Use commas to separate the individual data.",
        pl: "Użyj przecinków do oddzielenia poszczególnych danych.",
        fr: "Utilisez des virgules pour séparer les données individuelles.",
      },
    },
  },
  ManageCategories: {
    empty: {
      pl: "Brak kategorii użytkownika",
      en: "No user categories",
      fr: "Aucune catégorie d'utilisateur",
    },
  },
  Errors: {
    title: {
      en: "Error ",
      pl: "Błąd ",
      fr: "Erreur ",
    },
    "1.1": {
      //FE validation
      en: "Budget name is too long.",
      pl: "Nazwa budżetu jest zbyt długa.",
      fr: "Le nom du budget est trop long.",
    },
    "1.2": {
      //FE validation
      en: "Name cannot be empty.",
      pl: "Nazwa nie może być pusta.",
      fr: "Le nom ne peut pas être vide.",
    },
    "1.3": {
      //FE validation
      en: "Name is too long.",
      pl: "Nazwa jest zbyt długa.",
      fr: "Le nom est trop long.",
    },
    "1.4": {
      //TOAST
      en: "Budget with given name already exists.",
      pl: "Budżet o podanej nazwie już istnieje.",
      fr: "Un budget portant le nom donné existe déjà.",
    },
    "1.5": {
      //FE validation
      en: "Start date cannot be empty.",
      pl: "Data rozpoczęcia nie może być pusta.",
      fr: "La date de début ne peut pas être vide.",
    },
    "1.6": {
      //FE validation
      en: "End date cannot be empty.",
      pl: "Data zakończenia nie może być pusta.",
      fr: "La date de fin ne peut pas être vide.",
    },
    "1.7": {
      //FE validation
      en: "Start date must be earlier than end date.",
      pl: "Data rozpoczęcia musi być wcześniejsza niż data zakończenia.",
      fr: "La date de début doit être antérieure à la date de fin.",
    },
    "1.8": {
      //FE validation
      en: "Limit cannot be empty.",
      pl: "Limit nie może być pusty.",
      fr: "La limite ne peut pas être vide.",
    },
    "1.9": {
      //FE validation
      en: "Limit must be greater than 0.",
      pl: "Limit musi być większy niż 0.",
      fr: "La limite doit être supérieure à 0.",
    },
    "1.10": {
      //Not working with hardcoded currency
      en: "Currency is not supported.",
      pl: "Waluta nie jest obsługiwana.",
      fr: "La monnaie n'est pas supporté.",
    },
    "1.11": {
      //TOAST
      en: "Budget not exists.",
      pl: "Budżet nie istnieje.",
      fr: "Le budget n'existe pas.",
    },
    "1.12": {
      //TOAST
      en: "Budget ID cannot be empty.",
      pl: "ID budżetu nie może być puste.",
      fr: "L'identifiant du budget ne peut pas être vide.",
    },
    "1.13": {
      //TOAST
      en: "Icon cannot be empty.",
      pl: "Ikona nie może być pusta.",
      fr: "L'icône ne peut pas être vide.",
    },
    "1.14": {
      //TOAST
      en: "Limit is not in a valid format.",
      pl: "Limit nie jest w prawidłowym formacie.",
      fr: "La limite n'est pas dans un format valide.",
    },
    "1.15": {
      //TOAST
      en: "Start date is invalid.",
      pl: "Nieprawidłowa data rozpoczęcia.",
      fr: "La date de début n'est pas valide.",
    },
    "1.16": {
      //TOAST
      en: "End date is invalid.",
      pl: "Nieprawidłowa data zakończenia.",
      fr: "La date de fin n'est pas valide.",
    },
    "1.17": {
      //TOAST
      en: "Icon name is required.",
      pl: "Nazwa ikony jest wymagana.",
      fr: "Le nom de l'icône est obligatoire.",
    },
    "1.18": {
      //TOAST
      en: "Foreground should be a hexadecimal code.",
      pl: "Kolor pierwszego planu powinien być kodem szesnastkowym.",
      fr: "L'avant-plan doit être un code hexadécimal.",
    },
    "1.19": {
      //TOAST
      en: "Background should be a hexadecimal code.",
      pl: "Kolor tła powinien być kodem szesnastkowym.",
      fr: "L'arrière-plan doit être un code hexadécimal.",
    },
    "1.20": {
      //TOAST
      en: "Category name is required.",
      pl: "Nazwa kategorii jest wymagana.",
      fr: "Le nom de la catégorie est obligatoire.",
    },
    "1.21": {
      //TOAST
      en: "Category name must be unique.",
      pl: "Nazwa kategorii musi być unikalna.",
      fr: "Le nom de la catégorie doit être unique.",
    },
    "1.22": {
      //TOAST
      en: "Built-in category cannot be deleted.",
      pl: "Nie można usunąć wbudowanej kategorii.",
      fr: "La catégorie intégrée ne peut pas être supprimée.",
    },
    "1.23": {
      //TOAST
      en: "Category does not belong to the budget.",
      pl: "Kategoria nie należy do tego budżetu.",
      fr: "La catégorie n'appartient pas au budget.",
    },
    "1.24": {
      //TOAST
      en: "Cannot delete the category because it is used in one or more transactions.",
      pl: "Nie można usunąć kategorii, ponieważ jest używana w jednej lub więcej transakcjach.",
      fr: "Impossible de supprimer la catégorie car elle est utilisée dans une ou plusieurs transactions.",
    },
    "2.1": {
      //FE validation
      en: "Transaction type cannot be empty.",
      pl: "Typ transakcji nie może być pusty.",
      fr: "Le type de transaction ne peut pas être vide.",
    },
    "2.2": {
      //TOAST
      en: "Invalid budget transaction type.",
      pl: "Nieprawidłowy typ transakcji budżetu.",
      fr: "Type de transaction invalid",
    },
    "2.3": {
      //FE validation
      en: "Transaction name cannot be empty.",
      pl: "Nazwa transakcji nie może być pusta.",
      fr: "Le nom de la transaction ne peut pas être vide.",
    },
    "2.4": {
      //FE validation
      en: "Transaction name is too long.",
      pl: "Nazwa transakcji jest zbyt długa.",
      fr: "Le nom de la transaction est trop long.",
    },
    "2.5": {
      //FE validation
      en: "Value cannot be empty.",
      pl: "Wartość nie może być pusta.",
      fr: "La valeur ne peut pas être vide.",
    },
    "2.6": {
      //FE validation - FE adds positive for income or negative for expense
      en: "Value must be positive for income or negative for expense.",
      pl: "Wartość musi być dodatnia dla wpływów lub ujemna dla wydatków.",
      fr: "La valeur doit être positive pour une recette ou négative pour une dépense.",
    },
    "2.7": {
      //FE validation
      en: "Category cannot be empty.",
      pl: "Kategoria nie może być pusta.",
      fr: "La catégorie ne peut pas être vide.",
    },
    "2.8": {
      //TOAST
      en: "Category is invalid.",
      pl: "Nieprawidłowa kategoria.",
      fr: "La catégorie est invalide.",
    },
    "2.9": {
      //FE validation
      en: "Transaction date is outside the budget period.",
      pl: "Data transakcji znajduje się poza okresem budżetowym.",
      fr: "La date de la transaction est en dehors de la période du budget.",
    },
    "2.10": {
      //TOAST
      en: "Transaction does not belong to the specified budget.",
      pl: "Transakcja nie należy do określonego budżetu.",
      fr: "La transaction n'appartient pas au budget spécifié.",
    },
    "2.11": {
      //TOAST
      en: "Budget transaction not exists.",
      pl: "Transakcja budżetu nie istnieje.",
      fr: "La transaction du budget n'existe pas.",
    },
    "2.12": {
      //TOAST
      en: "Transaction ID cannot be empty.",
      pl: "ID transakcji nie może być puste.",
      fr: "L'ID de la transaction ne peut pas être vide.",
    },
    "2.13": {
      //TOAST
      en: "Transaction date cannot be empty.",
      pl: "Data transakcji nie może być pusta.",
      fr: "La date de transaction ne peut pas être vide.",
    },
    "2.14": {
      //TOAST
      en: "Transaction date is invalid.",
      pl: "Nieprawidłowa data transakcji.",
      fr: "La date de transaction n'est pas valide.",
    },
    "2.15": {
      //TOAST
      en: "Transaction status cannot be empty.",
      pl: "Status transakcji nie może być pusty.",
      fr: "Le statut de la transaction ne peut pas être vide.",
    },
    "2.16": {
      //TOAST
      en: "Transaction status must be active or cancelled.",
      pl: "Status transakcji musi być aktywny lub anulowany.",
      fr: "Le statut de la transaction doit être actif ou annulé.",
    },
    "2.17": {
      //TOAST
      en: "Transaction value is not in a valid format.",
      pl: "Wartość transakcji nie jest w prawidłowym formacie.",
      fr: "La valeur de la transaction n'est pas dans un format valide.",
    },
    "2.18": {
      //TOAST
      en: "Transaction cannot have more than one attachment.",
      pl: "Transakcja może mieć maksymalnie jeden załącznik.",
      fr: "La transaction ne peut avoir plus d'une pièce jointe.",
    },
    "3.1": {
      //FE validation
      en: "Avatar cannot be empty.",
      pl: "Awatar nie może być pusty.",
      fr: "L'avatar ne peut pas être vide.",
    },
    "3.2": {
      //FE validation
      en: "First name cannot be empty.",
      pl: "Imię nie może być puste.",
      fr: "Le prénom ne peut pas être vide.",
    },
    "3.3": {
      //FE validation
      en: "Last name cannot be empty.",
      pl: "Nazwisko nie może być puste.",
      fr: "Le nom ne peut pas être vide.",
    },
    "3.4": {
      //FE validation
      en: "Email cannot be empty.",
      pl: "Email nie może być pusty.",
      fr: "L'e-mail ne peut pas être vide.",
    },
    "3.5": {
      //FE validation
      en: "Email is invalid.",
      pl: "Nieprawidłowy email.",
      fr: "L'e-mail est invalide.",
    },
    "3.6": {
      //FE validation
      en: "Password does not meet criteria...",
      pl: "Hasło nie spełnia kryteriów...",
      fr: "Le mot de passe ne correspond pas aux critères…",
    },
    "3.11": {
      //TOAST
      en: "User not exists.",
      pl: "Użytkownik nie istnieje.",
      fr: "L'utilisateur n'existe pas.",
    },
    "10.1": {
      //CONSOLE
      en: "Invalid page.",
      pl: "Nieprawidłowa strona.",
      fr: "Page invalide.",
    },
    "10.2": {
      //CONSOLE
      en: "Invalid sort descriptor.",
      pl: "Nieprawidłowy deskryptor sortowania.",
      fr: "Descripteur de tri invalide.",
    },
    "11.1": {
      //TOAST
      en: "File is required.",
      pl: "Plik jest wymagany.",
      fr: "Le fichier est requis.",
    },
    "11.2": {
      //TOAST
      en: "File is too big.",
      pl: "Plik jest za duży.",
      fr: "Le fichier est trop volumineux.",
    },
    "11.3": {
      //TOAST
      en: "File type not allowed.",
      pl: "Niedozwolony typ pliku.",
      fr: "Type de fichier non autorisé.",
    },
    noErrorCode: {
      //no ErrorCode from BE
      en: "An unexpected error occurred.",
      pl: "Wystąpił nieoczekiwany błąd.",
      fr: "Une erreur inattendue est apparue.",
    },
    status401: {
      //TOAST
      en: "Session expired. Redirect to Sign In...",
      pl: "Sesja wygasła. Przekierowanie do strony logowania...",
      fr: "Session expirée. Rediriger vers la connexion...",
    },
    status403: {
      //CONSOLE
      en: "Forbidden.",
      pl: "Zabroniony.",
      fr: "Interdit.",
    },
    status404: {
      //CONSOLE
      en: "Not found.",
      pl: "Nie znaleziono.",
      fr: "Pas trouvé.",
    },
    status500: {
      //CONSOLE
      en: "Internal server error.",
      pl: "Wewnętrzny błąd serwera.",
      fr: "Erreur interne du serveur.",
    },
    defaultError: {
      en: "Oops, something went wrong.",
      pl: "Ups, coś poszło nie tak.",
      fr: "Oups, quelque chose a mal tourné.",
    },
  },
};

export default dictionary;

export type dictionaryType = typeof dictionary;
