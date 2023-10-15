import controller from './signinController'

export async function POST(request: Request) {
  return controller.signin(request);
}
