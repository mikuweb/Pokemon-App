import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Rule = () => {
  const [isOpen, setIsOpen] = useState(false);

  // OPEN RULE-MODAL: USER'S FIRST VISIT
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-fit text-base font-semibold px-3 py-1 mt-3 mb-3 md:my-4 bg-yellow-400 hover:bg-yellow-500 text-blue-600 rounded-full"
      >
        LEARN THE RULES
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-700/80 p-6 shadow-xl transition-all">
                  <div className="flex">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-bold text-yellow-400"
                    >
                      Rule of the game
                    </Dialog.Title>
                    <button
                      type="button"
                      className="p-1 ml-auto border-2 border-white hover:opacity-70 text-white rounded-full transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <AiOutlineClose size={25} />
                    </button>
                  </div>
                  <div className="mt-4 text-white relative flex justify-center">
                    <ul className="list-disc text-2xl text-left">
                      <li className="pb-2">
                        <p className="pl-2">You guess the Pokémon name</p>
                      </li>
                      <li className="pb-2">
                        <p className="pl-2">
                          Every correct guess awards 10 Pts
                        </p>
                      </li>
                      <li className="pb-2">
                        <p className="pl-2">Solving award 20 Pts</p>
                      </li>
                      <li className="pb-2">
                        <p className="pl-2">Every mistake deducts 15 Pts</p>
                      </li>
                      <li>
                        <p className="pl-2">Have fun playing!</p>
                      </li>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Rule;
