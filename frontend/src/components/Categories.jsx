import React from "react"
import { assets } from "../assets/assets"
import Title from "./Title"
import { useNavigate } from "react-router-dom"

const Categories = () => {

  const navigate = useNavigate()

  const fabrics = [
    { img: assets.cat_oversized, label: "OVERSIZED", value: "Oversized T-Shirts" },
    { img: assets.cat_tshirt, label: "T-SHIRTS", value: "Normal T-Shirts" },
    { img: assets.cat_tank, label: "TANK TOPS", value: "Tank Tops" },
    { img: assets.cat_hoodie, label: "HOODIES", value: "Hoodies" }
  ]

  const handleClick = (subCategory) => {
    navigate(`/collection?subCategory=${subCategory}`)
  }

  return (
    <section className="w-full py-20 px-4 sm:px-10 lg:px-16">

      <div className="text-center">
        <Title text1="SHOP BY" text2="STYLE" />
      </div>

      <div className="
        mt-12 grid grid-cols-2 md:grid-cols-4
        gap-4 sm:gap-8 place-items-center max-w-[1400px] mx-auto
      ">
        {fabrics.map(item => (
          <div
            key={item.label}
            onClick={() => handleClick(item.value)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <div className="
              w-full aspect-[4/5]
              bg-[#f5f5f5] overflow-hidden
              transition-all duration-500
              group-hover:shadow-2xl
            ">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <p className="
              mt-3 text-[8px] sm:text-sm tracking-widest font-bold uppercase text-center
              relative after:block after:h-[2px] after:w-0
              after:bg-brand-red after:transition-all after:duration-300
              group-hover:after:w-full
            ">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Categories
