export default {
  // Common
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    back: 'Back',
    loading: 'Loading...',
    noData: 'No Data',
    systemName: 'Micro Frontend System',
    enter: 'Enter',
    logoutConfirm: 'Are you sure you want to logout?',
    logoutSuccess: 'Logout successful',
    browse: 'Browse',
    learn: 'Learn',
    register: 'Register',
    and: 'and'
  },
  
  // Login
  login: {
    title: 'User Login',
    subtitle: 'Choose your identity to start using our services',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    usernamePlaceholder: 'Please enter username or email',
    emailPlaceholder: 'Enter email',
    passwordPlaceholder: 'Enter password',
    submit: 'Login',
    success: 'Login successful',
    failed: 'Login failed',
    noAccount: 'No account?',
    toRegister: 'Register new account',
    registerNow: 'Register now',
    forgotPassword: 'Forgot password?',
    orLoginWith: 'Or continue with'
  },
  
  // Register
  register: {
    title: 'User Registration',
    createAccount: 'Create Your Account',
    joinPlatform: 'Join our platform as user, designer, supplier, contractor or project manager',
    subtitle: 'Join our platform as user, designer, supplier or project manager',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    emailCode: 'Email Verification Code',
    phone: 'Phone Number',
    usernamePlaceholder: 'Please enter username',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Enter password',
    confirmPasswordPlaceholder: 'Confirm password',
    emailCodePlaceholder: 'Enter verification code',
    phonePlaceholder: 'Optional',
    sendCode: 'Send Code',
    codeSent: 'Verification code sent',
    codeSendFailed: 'Failed to send verification code',
    agreePrefix: 'I agree to',
    agreeToTerms: 'I agree to',
    serviceTerms: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    termsContent: 'Here is the detailed content of the terms of service...',
    privacyContent: 'Here is the detailed content of the privacy policy...',
    submit: 'Register',
    success: 'Registration successful',
    failed: 'Registration failed',
    hasAccount: 'Already have an account?',
    toLogin: 'Login now',
    // Designer specific
    designerInfo: 'Designer Type',
    designerType: 'Designer Type',
    individual: 'Individual',
    studio: 'Studio',
    company: 'Company',
    designerName: 'Designer/Company Name',
    designerNamePlaceholder: 'Your design studio name',
    roomTypes: 'Specialized Room Types',
    living: 'Living Room',
    bedroom: 'Bedroom',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    restaurant: 'Dining Room',
    study: 'Study',
    balcony: 'Balcony',
    entrance: 'Entrance',
    children: 'Children Room',
    storage: 'Storage',
    // Supplier specific
    supplierInfo: 'Company Name',
    companyName: 'Company Name',
    companyNamePlaceholder: 'Your company name',
    contactPerson: 'Contact Person',
    contactPersonPlaceholder: 'Company contact person',
    contactPhone: 'Contact Phone',
    contactPhonePlaceholder: 'Company contact phone',
    companyAddress: 'Company Address',
    companyAddressPlaceholder: 'e.g.: 123 Main Street',
    businessScope: 'Business Scope',
    businessScopePlaceholder: 'Optional',
    city: 'City',
    selectCity: 'Select City',
    district: 'District',
    selectDistrict: 'Select District',
    street: 'Street',
    streetPlaceholder: 'Enter street',
    zipCode: 'Zip Code',
    zipCodePlaceholder: 'Zip code',
    businessCategories: 'Business Categories',
    furniture: 'Furniture',
    lighting: 'Lighting',
    flooring: 'Flooring',
    wallpaper: 'Wallpaper',
    curtains: 'Curtains',
    accessories: 'Accessories',
    appliances: 'Appliances',
    other: 'Other',
    introduction: 'Introduction',
    introductionPlaceholder: '',
    // Contractor specific
    contractorInfo: 'Contractor Information',
    contractorType: 'Contractor Type',
    team: 'Team',
    contractorName: 'Contractor Name',
    contractorNamePlaceholder: 'Your contractor team/company name',
    workTypes: 'Work Types',
    demolition: 'Demolition',
    plumbing: 'Plumbing',
    electrical: 'Electrical',
    flooringWork: 'Flooring',
    painting: 'Painting',
    tiling: 'Tiling',
    carpentry: 'Carpentry',
    hvac: 'HVAC',
    contractorPhone: 'Contact Phone',
    contractorPhonePlaceholder: 'Contractor contact phone',
    contractorCity: 'City',
    contractorDistrict: 'District',
    contractorAddress: 'Address',
    contractorAddressPlaceholder: 'Contractor detailed address',
    contractorScope: 'Business Scope',
    contractorScopePlaceholder: 'Describe your construction service scope'
  },
  
  // Roles
  roles: {
    designer: 'B-side Designer',
    designerDesc: 'Upload and sell your designs',
    supplier: 'B-side Supplier',
    supplierDesc: 'Sell products on platform',
    contractor: 'B-side Contractor',
    contractorDesc: 'Take on renovation projects',
    user: 'C-side User',
    userDesc: 'Browse and order products',
    guest: 'Guest',
    guestDesc: 'Visitor browsing mode'
  },
  
  // Validation
  validation: {
    usernameRequired: 'Please enter username',
    usernameLength: 'Username must be at least 3 characters',
    emailRequired: 'Please enter email',
    emailFormat: 'Invalid email format',
    passwordRequired: 'Please enter password',
    passwordLength: 'Password must be at least 6 characters',
    confirmPasswordRequired: 'Please confirm password',
    passwordNotMatch: 'Passwords do not match',
    emailCodeRequired: 'Please enter email verification code',
    phoneFormat: 'Invalid phone number format',
    agreementRequired: 'Please agree to the terms of service and privacy policy',
    designerNameRequired: 'Please enter designer/company name',
    companyNameRequired: 'Please enter company name',
    contactPersonRequired: 'Please enter contact person',
    contactPhoneRequired: 'Please enter contact phone',
    contractorNameRequired: 'Please enter contractor name',
    contractorPhoneRequired: 'Please enter contractor contact phone'
  },
  
  // Navigation
  nav: {
    dashboard: 'Dashboard',
    designer: 'B-side Designer',
    supplier: 'B-side Supplier',
    contractor: 'B-side Contractor',
    user: 'C-side User',
    logout: 'Logout',
    profile: 'Profile',
    settings: 'Settings'
  },
  
  // Page titles
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome to Micro Frontend System',
    description: 'A micro frontend architecture system based on Vue 3 + Wujie',
    designerDesc: 'Professional design tools and template management for designers',
    supplierDesc: 'Supplier management platform for orders and inventory',
    userDesc: 'C-side user interface providing excellent user experience'
  },
  
  designer: {
    title: 'B-side Designer',
    app: 'Designer App'
  },
  
  supplier: {
    title: 'B-side Supplier',
    app: 'Supplier App'
  },
  
  contractor: {
    title: 'B-side Contractor',
    app: 'Contractor App'
  },
  
  user: {
    title: 'C-side User',
    app: 'User App'
  },
  
  guest: {
    title: 'Guest Mode',
    dashboard: 'Guest Dashboard',
    welcome: 'Welcome Guest',
    description: 'Guests can browse some public content',
    browseProducts: 'Browse Products',
    browseProductsDesc: 'View our product showcase and service introduction',
    aboutUs: 'About Us',
    aboutUsDesc: 'Learn about our company culture and development history',
    joinUs: 'Join Us',
    joinUsDesc: 'Register as a formal user to enjoy complete services',
    notice: 'Guest Notice',
    noticeDesc: 'You are currently visiting as a guest with limited functionality. Register and login for full services.',
    guestLimitMessage: 'Guest mode has limited functionality. Please register and login for full features.'
  }
}