import controller from './signupController'

export async function POST(request: Request) {
  return controller.signup(request);
}
