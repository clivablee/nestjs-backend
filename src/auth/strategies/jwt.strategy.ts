import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    console.log("[5] JWT STRATEGY: ", configService.get<string>('SECRET_KEY'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    } as StrategyOptionsWithoutRequest);
}

  async validate(payload: any) {
    console.log("[5] PAYLOAD: ", payload);
    return {
      emp_id: payload.emp_id,
      email_work: payload.email_work,
      payload: payload,
    };
  }
}
