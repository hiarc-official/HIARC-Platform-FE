// Next.js가 빌드 타임에 인라인하는 NEXT_PUBLIC_* 변수용 최소 타입.
// 브라우저 패키지라 전체 @types/node 를 끌어오지 않고 process.env 만 선언한다.
declare const process: {
  env: Record<string, string | undefined>;
};
