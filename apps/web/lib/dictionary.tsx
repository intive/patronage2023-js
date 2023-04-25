const dictionary = {
  NavigationLayout: {
    SideNav: {
      budgetsItem: {
        title: { en: "Budgets", pl: "Budżety" },
        searchInputPlaceholder: { en: "Search budget", pl: "Wyszukaj budżet" },
        buttonLabel: { en: "Add new budget", pl: "Dodaj nowy budżet" },
      },
      reportsItem: {
        title: { en: "Reports", pl: "Raporty" },
      },
      settingsItem: {
        title: { en: "Settings", pl: "Ustawienia" },
      },
      teamsItem: {
        title: { en: "Teams", pl: "Zespoły" },
        searchInputPlaceholder: { en: "Search team", pl: "Wyszukaj zespół" },
        buttonLabel: { en: "Add new member", pl: "Dodaj nowego członka" },
      },
    },
  },
  RegFlowLayout: {
    signIn: {
      h1: {
        en: "Log in with your email",
        pl: "Zaloguj się za pomocą swojego adresu email",
      },
      paragraph: {
        en: "Use your email to log in to your team workspace",
        pl: "Użyj swojego adresu email, aby zalogować się do obszaru roboczego zespołu",
      },
    },
    signUp: {
      h1: {
        en: "Get started with your free account today",
        pl: "Zacznij korzystać z bezpłatnego konta już dziś",
      },
      paragraph: {
        en: "No credit card required",
        pl: "Karta kredytowa nie jest wymagana",
      },
    },
  },
  WelcomePage: {
    welcomeText: { en: "Welcome to Inbudget", pl: "Witaj w Inbudget" },
  },
  MainPage: {
    welcomeText: { en: "Welcome to Inbudget", pl: "Witaj w Inbudget" },
    createAccountLink: {
      en: "Create my free account!",
      pl: "Utwórz bezpłatne konto!",
    },
  },
  SignInPage: {
    form: {
      errorMessage: {
        en: "Invalid credentials. Please try again.",
        pl: "Nieprawidłowy email lub hasło. Proszę spróbuj ponownie.",
      },
      emailInput: {
        label: { en: "Email", pl: "Email" },
        wrongFormatError: {
          en: "This is not a valid email",
          pl: "To nie jest prawidłowy adres email",
        },
      },
      passwordInput: {
        label: { en: "Password", pl: "Hasło" },
        min3CharactersError: {
          en: "Password must have at least 3 characters",
          pl: "Hasło musi mieć co najmniej 3 znaki",
        },
      },
      submitButton: { en: "Log In", pl: "Zaloguj" },
    },
  },
  SignUpPage: {
    passwordComponent: {
      mainHeader: { en: "Let's secure the account", pl: "Zabezpieczmy konto" },
      subHeader: {
        en: "Use password to protect your account",
        pl: "Użyj hasła, aby zabezpieczyć konto",
      },
      requirementsHeader: {
        en: "Your password must contain at least:",
        pl: "Twoje hasło musi zawierać przynajmniej:",
      },
      requirementUpperCase: {
        en: "One upper case character",
        pl: "Jedną wielką literę",
      },
      requirementLowerCase: {
        en: "One lower case character",
        pl: "Jedną małą literę",
      },
      requirementSpecialCharacter: {
        en: "One special character",
        pl: "Jeden znak specjalny",
      },
      requirementNoSpace: { en: "No spaces", pl: "Nie może zawierać spacji" },
      requirementLength: {
        en: "12 characters or more",
        pl: "Musi składać się z 12 lub więcej znaków",
      },
      inputPlaceholderPassword: {
        en: "Password",
        pl: "Hasło",
      },
      inputPlaceholderRepeatPassword: {
        en: "Repeat password",
        pl: "Powtórz hasło",
      },
      buttonBack: {
        en: "Back",
        pl: "Powrót",
      },
      buttonNext: {
        en: "Continue",
        pl: "Dalej",
      },
      inputErrors: {
        missingUpperCase: {
          en: "The password should contain at least one upper case character",
          pl: "Hasło powinno zawierać przynajmniej jedną wielką literę",
        },
        missingLowerCase: {
          en: "The password should contain at least one lower case character",
          pl: "Hasło powinno zawierać przynajmniej jedną małą literę",
        },
        missingSpecialCharacter: {
          en: "The password should contain at least one special character",
          pl: "Hasło powinno zawierac przynajmniej jeden znak specjalny",
        },
        spacesCheck: {
          en: "The password should not contain spaces",
          pl: "Hasło nie powinno zawierać spacji",
        },
        longCheck: {
          en: "The password should be at least 12 characters long",
          pl: "Hasło powinno zawierać przynajmniej 12 znaków",
        },
        matchError: {
          en: "Passwords do not match",
          pl: "Podane hasła różnią się od siebie",
        },
      },
    },
    paragraph: {
      en: "Hello from Sign-Up page",
      pl: "Witaj ze strony rejestracji",
    },
    profileScreen: {
      title: {
        en: "Customise the account",
        pl: "Spersonalizuj swoje konto",
      },
      subtitle: {
        en: "Select your avatar and tell us your name",
        pl: "Wybierz avatar i powiedz jak się nazywasz",
      },
      firstNameInputLabel: {
        en: "First name",
        pl: "Imię",
      },
      lastNameInputLabel: {
        en: "Last name",
        pl: "Nazwisko",
      },
      inputErrorMsg: {
        en: "The field cannot be empty",
        pl: "Pole nie może być puste",
      },
      backButton: {
        en: "Back",
        pl: "Powrót",
      },
      submitButton: {
        en: "Create account",
        pl: "Utwórz konto",
      },
    },
    emailScreen: {
      inputLabel: {
        en: "Email",
        pl: "Email",
      },
      invalidEmailError: {
        en: "This is not a valid email",
        pl: "To nie jest prawidłowy adres email",
      },
      buttonNext: {
        en: "Continue",
        pl: "Dalej",
      },
      footer: {
        en: "Already have an account?",
        pl: "Posiadasz już konto?",
      },
      footerLink: {
        en: "Log in",
        pl: "Zaloguj się",
      },
    },
    successErrorScreen: {
      status: {
        error: {
          subheader: {
            en: "The account with this email already exists",
            pl: "Konto z tym adresem e-mail już istnieje",
          },
          header: {
            en: "Something went wrong",
            pl: "Coś poszło nie tak",
          },
          button: {
            en: "Back to the registration process",
            pl: "Powrót do rejestracji",
          },
        },
        success: {
          subheader: {
            en: "You've successfully created your account",
            pl: "Pomyślnie utworzyłeś swoje konto",
          },
          header: {
            en: "Congratulations",
            pl: "Gratulacje",
          },
          button: {
            en: "Log in to your account",
            pl: "Zaloguj się",
          },
        },
      },
    },
  },
  BudgetsPage: {
    title: { en: "Budgets page", pl: "Budżety" },
    dropdownButtonAriaLabel: { en: "More options", pl: "Więcej opcji" },
  },
  ReportsPage: { title: { en: "Reports page", pl: "Raporty" } },
  SettingsPage: { title: { en: "Settings page", pl: "Ustawienia" } },
  TeamPage: { title: { en: "Team page", pl: "Zespoły" } },
};

export default dictionary;

export type dictionaryType = typeof dictionary;
