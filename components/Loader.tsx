import { Box, Center } from "@chakra-ui/react";
import { MagnifyingGlass, Triangle } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader() {
    return (
        <>
            <MagnifyingGlass
                visible={true}
                height="40"
                width="40"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </>
    );
}
export function LoaderTwo() {
    return (
        <Triangle
            visible={true}
            height="40"
            width="40"
            ariaLabel="Triangle-loading"
            wrapperStyle={{
                display: "flex",
                justifyContent: "center",
            }}
            color="#e15b64"
        />
    );
}
export function LoaderThree() {
    return (
        <Triangle
            visible={true}
            height="80"
            width="80"
            ariaLabel="Triangle-loading"
            wrapperStyle={{
                display: "flex",
                justifyContent: "center",
            }}
            color="#e15b64"
        />
    );
}
