import crypto from 'crypto'
export function hashPassword(password: string) {
    const salt = 'some-salt'
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
}