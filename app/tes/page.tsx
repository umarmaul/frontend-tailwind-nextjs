import Image from "next/image";

async function getData() {
    const res = await fetch(
        "http://194.238.16.213:1122/api/v1/single-user/669a67d696df9d9b1a38774d"
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const data = await getData();
    const picture = data.data.profile_picture;
    console.log(picture);

    return (
        <div>
            <Image src={picture} alt="" width={200} height={200}></Image>
        </div>
    );
}
