import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const session = {
  user: {
    name: "testidpperf3@fakemail.com",
    sub: "testidpperf3@fakemail.com",
    type: "OPEN",
    subscriberId: "3",
    id_token:
      "eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiRWRycjVfeEVVQnZJSThhbUdyXzhsdyIsInN1YiI6InRlc3RpZHBwZXJmM0BmYWtlbWFpbC5jb20iLCJvcmciOiJUZWxlY29tIiwiYXVkaXRUcmFja2luZ0lkIjoiNTY0NzIwYzQtOGJhZS00ZWIzLWIyZTItMDc3ZjVhMzJjYWEyLTI4MjI5NiIsInN1Ym5hbWUiOiJ0ZXN0aWRwcGVyZjNAZmFrZW1haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9pZHBzZXNpb250LnRlbGVjb20uY29tLmFyOjQ0My9vcGVuYW0vb2F1dGgyL2NvbnZlcmdlbnRlIiwidG9rZW5OYW1lIjoiaWRfdG9rZW4iLCJzaWQiOiJnYkJZc1ZDYjFpTUMzQW9BQmg1S1VWSytFTTFoOEJRRmFRdFM5TzFiVWxBPSIsImF1ZCI6Im9pZGMtcHBkLXRlc3QiLCJjX2hhc2giOiI5Z1RTbFc3ZENhWW93V20ycjZoOUJ3IiwiYWNyIjoiMCIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiJ6NmJram1mRnpuQWtpYW9FRXZTSGdHcURWMUEiLCJzX2hhc2giOiJrc2plVXo4U0lYSmxNaG5QWjhkZEZBIiwiYXpwIjoib2lkYy1wcGQtdGVzdCIsImF1dGhfdGltZSI6MTYzNTQ0NzI2NCwicmVhbG0iOiIvY29udmVyZ2VudGUiLCJyZWxhdGVkRGF0YSI6eyJTVUJTQ1JJQkVSSUQiOlsiMyJdLCJGTE9XSUQiOlsiMTEwMDAwMiJdfSwiZXhwIjoxNjM1NDUwODY2LCJ0b2tlblR5cGUiOiJKV1RUb2tlbiIsImlhdCI6MTYzNTQ0NzI2Nn0.coeAIwiChhhHQzQokYqPo-VK2CBGTVhDsljy0F5RJuAWTi2rdau9kxaiubSy7QRyXIQaV6s9mtrlbqAej2WonKspz5OeRO-sVpBrS23Ssc9lwehlr2KSYr-n9seJ4zPILumZmFnIshivoozkmURBd5hSSshfOYtdjeNGfM0Ks_80L0x8PHj-IQOlwjmxTXpISSwvKC37i8QdJgxpDJFbGtuLW01scU90b2BDWyrWfx8dQzjMKYzWphAHYMzrr47v4tu4dx68RkGuePd8Y4pklXTg1cLfutO0SxnSURD7Jnqxuzxpxp7vseMYCtBHTsjy50nd3GioBmDmfklOjTrO8g",
  },
  expires: "2021-11-27T18:54:27.258Z",
};

const useStore = () => {
  // const { data: session, status } = useSession();

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchProducts = async () => {
    setResult(null);
    setError(null);
    setFetching(true);
    const demoSubscriberID = "25693";
    try {
      const url =
        session.user?.type === "Movil"
          ? `/api/store/getProducts?idMovil=54${session.user?.sub}`
          : session.user?.type === "OPEN"
          ? `/api/store/getProducts?idSubscriber=${demoSubscriberID}`
          : `/api/store/getProducts`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      data.status === "success"
        ? setResult(data.result)
        : setError(data.message);

      // setResult(data.result);
    } catch (error) {
      console.error(error);
      // setResult(error);
    }
    setFetching(false);
  };

  return { result, error, fetching, fetchProducts };
};

export default useStore;
