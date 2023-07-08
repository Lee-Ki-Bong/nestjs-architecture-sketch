## 시작하기 전에

처음부터 너무 많은 개념을 동시에 제공하면 책상에 두꺼운 책을 턱하니 올려놓는 것과 같을 것이다.

빈 캔버스에 그림을 그리듯이 NestJS를 전체적으로 스케치 하고, 부위 별로 색을 채워가는 형태의 tutorial 을 구상해보았다.

이 tutorial 은 스케치에 해당하며, NestJS 가 어떻게 디자인 되어있는지 소개하는 데에 초점을 두었다.

더 자세한 정보를 얻고자 한다면 공식 docs를 정독해보길 바란다. [링크](https://docs.nestjs.com/)

## 핵심개념

NestJS를 살펴보기 전에 딱 두 가지 개념을 간단히 소개하고 시작하겠다.

### IoC 제어 역전(Inversion of Control)

- 제어역전을 한마디로 표현한다면 "개발자 대신 프레임워크가 제어 한다" 이다.
- 프레임워크에서 개발자가 작성한 코드를 필요한 시점에 알아서 실행시키게끔 제어를 가져가는 것이 IoC의 핵심 개념이다.

### 의존성 주입(Dependency Injection)

- 의존성 주입은 프레임워크가 주체가 되어 개발자가 등록한 클래스들을 알아서 관리해준다는 개념이다.

### 정리

- 정리하자면, Ioc는 추상적인 개념이고 이를 구현한 것이 DI 로 이해하면 된다.

### Nestjs는 의존성 주입(Dependency Injection)을 통해 IoC 제어 역전(Inversion of Control)를 구현한 프레임워크 이다.

- 프레임워크가 의존성을 관리해주기 때문에 앞으로 제시하는 코드에서는 new 연산자는 보이지 않을 것이다.

### TMI

객체지향적 설계의 트렌드는 구체적인 개념에 종속 & 의존하지 않고 추상적인 개념에 의존하려고 한다.
이는 시스템의 유연성과 재사용성을 높이기 위한 노력이 주요 키워드라는 것으로 이해할 수 있다.

## NestJS 소개

NestJS는 다음과 같은 핵심 구성들이 존재한다.
[호출순서](#프로바이더-호출-순서-정리)

### 모듈(Module):

- NestJS 애플리케이션을 구성하는 단위이다.
- 모듈은 자신이 필요하거나 공개할 기능을 정의하고 그룹화 한다.
- 잘 그룹화된 모듈은 재사용 가능한 단위로 활용된다.

### 프로바이더(Provider):

- 서비스, 미들웨어, 인터셉터, 가드, 레포지토리 등의 컴포넌트들을 통칭 프로바이더 라고 한다.
- 프로바이더는 싱글톤으로 관리되며, 특정한 문법을 통해 애플리케이션 전체에서 공유할 수 있다.

### 컨트롤러(Controller):

- 요청을 받고 응답을 반환하는 역할을 한다.
- 별도의 설정 없이 어떤 것을 리턴하여도, string 이나 JSON 형으로 각각 상황에 맞는 응답을 보내게 기본 동작이 내장되어 있다.
- 모듈에 속하며, NestJS만의 방식에 의해 라우터를 매핑 한다.
- 요청을 처리하는 주체가 아닌 라우터 역할만 하도록 하며, 실제 작업들의 주체는 프로바이더들에게 위임해야한다.

### 서비스(Service)

- 프로바이더를 대표하는 구성중에 하나가 Service 이다.
- 컨트롤러와 데이터 접근 계층 사이의 중간 역할이다.

### 레포지토리(Repository)

- 데이터베이스와의 상호작용을 담당한다.
- ORM(Object-Relational Mapping) 라이브러리를 사용하는데, TypeORM을 사용할 것이다.

### 미들웨어(Middleware):

- 미들웨어는 요청과 응답 사이에서 동작한다.
- 미들웨어는 요청 또는 응답을 변형하거나, 다음 미들웨어로 제어를 전달할 수 있다.
- 전역 | 컨트롤러별 | 요청 메서드별로 적용할 수 있다.
- Express와 유사한 미들웨어 개념을 사용한다. [미들웨어 vs 인터셉터](#잠깐-미들웨어-vs-인터셉터)

### 인터셉터(Interceptor):

- 인터셉터는 요청과 응답을 가로채고 가공하는 역할을 한다.
- 전역 | 컨트롤러별 | 컨트롤러메서드별로 적용할 수 있다.

### 가드(Guard):

- 가드는 요청을 처리하기 전에 인증, 권한 검사 등을 수행하는 역할을 한다.
- 요청을 처리할 수 있는 권한이 있는지 확인하고, 요청을 차단하거나 통과시킬 수 있다.

### 예외필터(Exception Filter):

- 필터는 예외 처리를 담당한다.
- 예외가 발생한 경우 호출되며, 적절한 응답을 반환하고 오류 처리를 수행한다.

### 파이프(Pipe)

- 파이프는 요청 데이터의 유효성 검사, 변환 및 필터링 처리를 수행한다.
- 내장된 몇 가지 유용한 파이프를 제공하며, 직접 커스텀 하여 사용할 수 있다.
- 패키지 설치가 필요하며, 자세한 내용은 다음 tutorial 에서 다루겠다.

## NestJS 맛보기

### 프로젝트 생성

```
root@8aece4bfc5fa:/home# nest new
⚡  We will scaffold your app in a few seconds..
? What name would you like to use for the new project? nest-sketch
? Which package manager would you ❤️  to use? npm
```

- 이 프로젝트에서는 체험이 목적이기에 디렉토리구조는 신경쓰지 않고 모두 src/ 에 두엇다.

### 미들웨어 작성

```javascript
//src/test.middleware.ts
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 요청 처리 로직 작성
    // 요청 가공 & 요청 로깅 & 인증 확인 등의 작업 수행가능

    res.on('finish', () => {
      // 응답 처리 로직 작성
      // 응답 로깅, 헤더 설정, 캐싱 등의 작업을 수행가능
    });

    // 다음 미들웨어나 라우터 핸들러로 제어를 전달
    // 만약 next()를 호출않는다면, 여기서 종료되며 다음 미들웨어나 라우터 핸들러는 실행되지 않음.
    next();
  }
}
```

### 인터셉터 작성

```javascript
//src/test.interceptor.ts
@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // 컨트롤러 메서드 실행 전에 실행된다
    // 이 부분에서 요청을 가로채 인증 확인, 데이터 변환, 로깅 등 작업을 수행가능.

    // next.handle()은 다음 단계의 핸들러를 호출하고, 해당 핸들러의 Observable을 반환.
    return next.handle().pipe(
      // tap() 오퍼레이터를 사용하여 응답을 가공하거나 추가 작업을 수행가능.
      // tap() 외에 다양한 오퍼레이터(Operator)를 적용할 수 있다. 찾아보길 바람.
      tap((response) => {
        // 컨트롤러 메서드 실행 후 응답을 가공하거나 응답 로깅, 헤더 설정, 캐싱 등 추가 작업을 수행가능.
      }),
    );
  }
}
```

### [잠깐] 미들웨어 VS 인터셉터

- 두 기능설명을 보면 겹치는 부분이 많을 것이다.
- 먼저 결론부터 말하면 인터셉터를 사용하는 것이 권장사항이다.
  - Nest.js의 미들웨어(Middleware) 기능은 Nest.js가 Express.js 위에서 구축된 프레임워크이였기 때문에 Express.js를 사용하던 개발자들이 Nest.js로 마이그레이션하거나 Nest.js에서 Express.js 기반 애플리케이션을 개발할 때 이전 코드를 보다 쉽게 재사용할 수 있도록 만들어진 기능이다.
  - 그러나, Nest.js는 Express.js만을 위한 프레임워크가 아니다.
- Nest.js는 자체적으로 추상화된 HTTP 요청-응답 계층을 나누어 제공하고 있다. (컨트롤러 <-> 인터셉터)
- 그리고, 미들웨어는 요청객체와 응답객체만을 받을 수 있지만, 인터셉터는 ExecutionContext를 통해 더 넓은 범위의 컨텍스트 정보에 접근할 수 있기 때문에 더 유연한 방식으로 활용될 수 있다.

### 필터 작성

- [참고] 아래 코드는 소개를 위해 작성되었기 때문에 온전한 예외처리를 위해선 추가적인 작업이 필요하다.

```javascript
@Catch()
export class TestExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    /**
     * @step 1 : 필요 정보를 가져온다
     */
    const statusCode = exception.getStatus();
    const message = exception.message;

    /**
     * @step 2 : 응답 가공
     */
    const responseBody = {
      statusCode: statusCode,
      path: this.httpAdapterHost.httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    /**
     * @step 3 : 다시 httpAdapter 에게 전달
     */
    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      statusCode,
    );
  }
```

### 가드 작성

```javascript
@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 이 블록 내에서 ExecutionContext를 통해 요청과 응답에 대한 정보를 확인
    // 사용자 인증, 접근 권한 확인 등의 작업

    const authenticationResult = true; // 다음 가드나 컨트롤러로 넘어간다.
    // const authenticationResult = false; // 403 예외를 발생시킨다.

    // 반환 값에 따라 다음 가드나 컨트롤러로의 제어 흐름이 결정
    return authenticationResult;
  }
}
```

### @Injectable()와 @Catch()

- 이걸 처음보는 사람은 무엇인지 궁금할 것이다. 이것은 데커레이터 라는 것이다.
- 이 tutorial 에서는 아래와 같이 고유한 기능을 소개하겠다.
  - @Injectable() : 이 데코레이터를 통해 의존성을 주입할 수 있다는 것.
  - @Catch() : 이 데코레이터를 통해 필터에서 예외필터 정의가 가능해지고 구현한 필터를 의존성 주입할 수 있다.

### 데커레이터

- 데커레이터에 대해 자세히 알고싶다면 docs를 찾아보길 바란다. [링크](https://docs.nestjs.com/custom-decorators)
- 간단히 요약하자면 데커레이터는 함수이며 프레임워크나 패키지에서 제공되는 데커레이터는 고유한 기능들이 존재한다.
- 특별한 경우 사용자정의 데커레이터도 정의하여 사용 가능하다.

### 컨트롤러

- Nest.js는 데코레이터를 사용하여 라우팅을 정의하는 방식을 지원
- @Controller() 데코레이터를 사용하여 컨트롤러 클래스에 라우팅 경로를 정의
- @Get(), @Post(), @Put(), @Delete() 등의 데코레이터를 사용하여 해당 경로에 대한 HTTP 메서드를 정의
- 아래는 /users 경로에 대한 GET 요청을 처리하는 UserController 클래스를 예시로 들어보았다.
- 현재 AppController의 데커레이터엔 빈문자열 이기때문에 / 가 경로가 된다.

```javascript
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findUsers(): User[] {
    return this.userService.findUsers();
  }
}
```

### 서비스

- 컨트롤러와 데이터 접근 계층 사이의 중간 역할.
- 데이터 접근 계층과의 관계 구현 설명은 다음에 다루겠다.

```javascript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### 모듈

- @Module 데코레이터는 해당 모듈에 대한 설정과 의존성을 정의한다.
- NestJS의 계층구조를 체험해보기 위해 Test 프로파이더들을 애플리케이션 전역에 등록하는 방법을 소개한다.
  - main.js 에 등록하는 방법도 있지만 이 방법이 공식 권장 방법이다.
  - 이 tutorial 은 애플리케이션 전체에 대한 등록을 가이드하였지만, 특정 라우터, 메서드에만 적용도 가능하다. 방법은 [링크](https://docs.nestjs.com/)를 참고하길 바란다.

```javascript
@Module({
  imports: [], // 다른 모듈을 가져오는 부분
  controllers: [AppController], // 컨트롤러를 등록하는 부분
  providers: [
    // 프로바이더를 등록하는 부분

    AppService, // 서비스를 등록

    // APP_GUARD를 통해 애플리케이션 전체에 대한 가드를 등록.
    {
      provide: APP_GUARD,
      useClass: TestGuard,
    },

    // APP_INTERCEPTOR를 통해 애플리케이션 전체에 대한 인터셉터를 등록.
    {
      provide: APP_INTERCEPTOR,
      useClass: TestInterceptor,
    },

    // APP_FILTER를 통해 애플리케이션 전체에 대한 필터를 등록.
    {
      provide: APP_FILTER,
      useClass: TestExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // MiddlewareConsumer를 통해 미들웨어를 등록하는 부분.
    // TestMiddleware를 등록하고, 모든 라우트('*')에 미들웨어를 적용.
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
```

## 이벤트 루프 육안으로 체험

- 프로젝트를 구동

```
npm run start:dev
```

- localhost:3000 로 GET 요청

### 요청에 대한 프로바이더 호출 순서

- 아래 로그는 현제 프로젝트에 등록된 프로바이더들의 호출순서이다.

```
# 성공시 : AppController 의 getHello 가 호출된 모습
[Nest] 516  - 07/08/2023, 1:26:33 PM   DEBUG [TestMiddleware] [Request] GET
[Nest] 516  - 07/08/2023, 1:26:33 PM     LOG [TestGuard] I'm test Guard
[Nest] 516  - 07/08/2023, 1:26:33 PM     LOG [TestInterceptor] [http] [AppController] [GET] [/] ["Hello World!"] 1ms
[Nest] 516  - 07/08/2023, 1:26:33 PM   DEBUG [TestMiddleware] [Response] statusCode: 200 +13ms
```

```
# 예외 발생시
[Nest] 475  - 07/08/2023, 1:10:14 PM   DEBUG [TestMiddleware] [Request] GET
[Nest] 475  - 07/08/2023, 1:10:14 PM     LOG [TestGuard] I'm test Guard
[Nest] 475  - 07/08/2023, 1:10:14 PM     LOG [TestExceptionFilter] [403] Forbidden resource // 가드 인증을 통과 못하였을때
[Nest] 475  - 07/08/2023, 1:10:14 PM   DEBUG [TestMiddleware] [Response] statusCode: 403 +11ms // 403 예외 발생한 모습
```

## 프로바이더 호출 순서 정리

- 정상 응답시
  - [요청]
    - 미들웨어
    - 가드
    - 요청을 가로채는 인터셉터
    - 컨트롤러
  - [응답]
    - 응답을 가로채는 인터셉터
    - 미들웨어
- 예외발 생시

  - [요청]
    - 미들웨어
    - 가드 [예외발생지점]
    - 예외를 가로채는 인터셉터
    - 예외필터
  - [응답]
    - 미들웨어

### 만약 같은 종류의 프로바이더가 있을시 등록 역순임을 명심해야한다.

- Interceptor_2 가 실행된 후 Interceptor_2 실행.
- 이건 필터와 가드도 마찬가지 이다.

```javascript
    {
      provide: APP_INTERCEPTOR,
      useClass: Interceptor_1,
    },
        {
      provide: APP_INTERCEPTOR,
      useClass: Interceptor_2,
    },
```
