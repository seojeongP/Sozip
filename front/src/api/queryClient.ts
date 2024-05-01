import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        //react-query는 요청이 실패하면 기본적으로 3번 재요청하는데 그거 안 되게 하는 코드임
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export default queryClient;