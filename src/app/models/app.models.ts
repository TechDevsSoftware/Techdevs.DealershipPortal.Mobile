export class UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  agreedToTerms: boolean;
  validatedEmail: boolean;
  userData: UserData;
}

export class UserData {
  myVehicles: UserVehicle[];
}

export class UserVehicle {
  make: string;
  model: string;
  registration: string;
  year: number;
}
