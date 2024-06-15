"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  DoorClosed,
  LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

interface SideNavbarIcon {
  Icon: LucideIcon;
  toggled: boolean;
  isOpen: boolean;
  text: string;
}

export const SideNavbar: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [toggledSideNavbarIcon, setToggledSideNavbarIcon] = useState([
    true,
    false,
  ]);

  return (
    <>
      <motion.div
        className="hidden md:inline relative w-[320px] z-[1001] bg-white"
        animate={{
          width: isOpen ? "320px" : "120px",
          transition: {
            duration: 1,
            type: "spring",
          },
        }}
      >
        <motion.div
          className="flex flex-col justify-between gap-4 fixed h-[95vh] top-0 bg-[#D0EBEB] rounded-2xl m-5 px-4 py-5"
          animate={{
            width: isOpen ? "300px" : "120px",
            transition: {
              duration: 1,
              type: "spring",
            },
          }}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer absolute top-10 w-12 h-12 shadow-2xl flex justify-center items-center ${
              isOpen
                ? "rounded-l-2xl right-0 bg-[#57CC99]/50"
                : "rounded-r-2xl -right-12 bg-[#57CC99]/50"
            }`}
          >
            {isOpen ? (
              <ChevronLeft size={22} className="" />
            ) : (
              <ChevronRight size={22} className="" />
            )}
          </div>
          <div className="flex flex-col h-full justify-between gap-6 px-2 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 justify-center items-center">
                <motion.div
                  className="w-[125px] h-[125px] bg-slate-400 rounded-full"
                  animate={{
                    width: isOpen ? "125px" : "50px",
                    height: isOpen ? "125px" : "50px",
                    transition: {
                      duration: 1,
                      type: "spring",
                    },
                  }}
                ></motion.div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.h1
                      variants={{
                        hidden: {
                          opacity: 0,
                          transition: {
                            duration: 0.2,
                          },
                        },
                        show: {
                          opacity: 1,
                          transition: {
                            duration: 0.2,
                          },
                        },
                      }}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="text-lg font-medium text-center"
                    >
                      Agent
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex justify-center py-2">
                <div className="max-h-12">
                  {isOpen ? (
                    <Image
                      src={"/logo.png"}
                      alt="CareAI"
                      width={230}
                      height={40}
                      className="h-full w-auto mx-auto"
                    />
                  ) : (
                    <Image
                      src={"/logo.png"}
                      alt="CareAI"
                      width={40}
                      height={40}
                      className="h-full w-auto mx-auto"
                    />
                  )}
                </div>
              </div>
              <Link legacyBehavior href="/dashboard/agent">
                <a draggable={false}>
                  <SideNavbarIcon
                    Icon={CircleUserRound}
                    text="Home"
                    toggled={toggledSideNavbarIcon[0]}
                    isOpen={isOpen}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <SignOutButton>
                <motion.div
                  whileHover={"hover"}
                  animate={"normal"}
                  className="w-full cursor-pointer relative py-2 self-end"
                >
                  <motion.div
                    whileTap={{ scale: 0.975 }}
                    initial={false}
                    variants={{
                      normal: {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                      hover: {
                        scale: 1.025,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    className={`border-2 border-[#22577A] mx-auto flex items-center justify-center shadow-md rounded-2xl ${
                      isOpen ? "gap-3 px-8 py-3" : "px-[1.1rem] py-[1rem]"
                    }`}
                  >
                    {<DoorClosed size={22} className="text-[#22577A]" />}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.h1
                          variants={{
                            hidden: {
                              opacity: 0,
                              transition: {
                                duration: 0.2,
                              },
                            },
                            show: {
                              opacity: 1,
                              transition: {
                                duration: 0.2,
                              },
                            },
                          }}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="text-[#22577A] font-medium"
                        >
                          Sign out
                        </motion.h1>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </SignOutButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 left-[-80vw] md:hidden w-[80vw] h-screen z-[1001]"
        animate={{
          left: isOpen ? "-80vw" : "0",
          transition: {
            duration: 1,
            type: "spring",
          },
        }}
      >
        <div className="relative w-full h-full">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer absolute top-10 w-12 h-12 shadow-2xl flex justify-center items-center ${
              isOpen
                ? "rounded-r-2xl -right-12 bg-[#57CC99]/50"
                : "rounded-l-2xl right-0 bg-[#57CC99]/50"
            }`}
          >
            {isOpen ? (
              <ChevronRight size={22} className="" />
            ) : (
              <ChevronLeft size={22} className="" />
            )}
          </div>
          <div className="bg-[#D0EBEB] w-full h-full flex flex-col gap-6 justify-between px-4 py-8 rounded-xl overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="w-[80px] h-[80px]">
                  <div className="w-full h-full bg-slate-400 rounded-full"></div>
                </div>
                <h1 className="text-md font-medium text-center">Agent</h1>
              </div>
              <div className="flex justify-center py-3 max-h-16">
                <div>
                  <Image
                    src={"/logo.png"}
                    alt="CareAI"
                    width={230}
                    height={40}
                    className="h-full w-auto mx-auto"
                  />
                </div>
              </div>
              <Link legacyBehavior href="/dashboard/agent">
                <a draggable={false}>
                  <SideNavbarIcon
                    Icon={CircleUserRound}
                    text="Home"
                    toggled={toggledSideNavbarIcon[0]}
                    isOpen={isOpen}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <SignOutButton>
                <div className="cursor-pointer w-full border-2 border-[#22577A] flex items-center justify-center shadow-md rounded-xl gap-3 py-2">
                  <div className="flex gap-2">
                    {<DoorClosed size={22} className="text-[#22577A]" />}
                    <h1 className="text-[#22577A] font-medium">Sign out</h1>
                  </div>
                </div>
              </SignOutButton>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SideNavbarIcon = ({ Icon, toggled, isOpen, text }: SideNavbarIcon) => {
  return (
    <>
      <motion.div
        whileHover={[toggled ? "" : "hover"]}
        animate={toggled ? "toggled" : "unToggled"}
        className="relative hidden md:inline"
      >
        <motion.div
          whileTap={{ scale: 0.975 }}
          initial={false}
          variants={{
            toggled: {
              background:
                "linear-gradient(145deg, #38A3A5 2.36%, #22577A 100%)",
            },
            unToggled: {
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            },
            hover: {
              scale: 1.025,
              backgroundColor: "rgba(255, 255, 255, 0.21)",
            },
          }}
          className={`text-white mx-auto flex justify-center items-center shadow-md rounded-2xl ${
            isOpen ? "gap-3 px-8 py-3" : "px-[1.1rem] py-[1rem]"
          }`}
        >
          {<Icon size={22} className="" />}
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={{
                  hidden: {
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                  show: {
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
                className=" font-medium"
              >
                {text}
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div
        className={`text-white md:hidden mx-auto flex items-center shadow-md rounded-xl gap-3 px-8 py-2 ${
          toggled ? "bg-gradien-primary" : "bg-white/10"
        }`}
      >
        {<Icon size={18} className="" />}
        <h1 className=" font-medium text-md">{text}</h1>
      </div>
    </>
  );
};
