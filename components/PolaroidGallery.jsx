import PolaroidPhoto from "./PolaroidPhoto";

export default function PolaroidGallery({ items }) {
  return (
    <div className="
      relative 
      flex 
      flex-wrap 
      justify-center 
      gap-6 
      mt-10
    ">
      {items.map((item, i) => (
        <div
          key={i}
          className={`
            ${i % 2 === 0 ? "mt-4" : "-mt-4"}
          `}
        >
          <PolaroidPhoto
            src={item.src}
            caption={item.caption}
            type={item.type}
          />
        </div>
      ))}
    </div>
  );
}