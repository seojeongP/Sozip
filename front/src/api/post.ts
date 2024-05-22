import { ImageUri, Post } from "@/types/domain";
import axiosInstance from "./axios";

type ResponsePost = Post & {images: ImageUri[]};

//게시물들 불러오는 api
const getPosts = async(page=1): Promise<ResponsePost[]> => {
    const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

    return data;
}

type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async(body: RequestCreatePost): Promise<ResponsePost> => {
    const {data} = await axiosInstance.post('/posts', body);

    return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async(id:number): Promise<ResponseSinglePost> => {
    const {data} = await axiosInstance.get(`/posts/${id}`);

    return data;
};

//즐겨찾기 게시물만 불러오기
const getFavoritePosts = async(page = 1): Promise<ResponsePost[]> => {
    const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

    return data;
}

const updateFavoritePost = async (id: number): Promise<number> => {
    const {data} = await axiosInstance.post(`/favorites/${id}`);

    return data;
}

export {createPost, getPost, getPosts, getFavoritePosts, updateFavoritePost};

export type {ResponsePost, RequestCreatePost, ResponseSinglePost};