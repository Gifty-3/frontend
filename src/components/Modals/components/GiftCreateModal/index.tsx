import { DEFAULT_CARD } from "@/components/Home/Cards/defaultCard";
import React, { FC, useId, useState } from "react";
import { THEMES } from "src/types/card";
import { useModal } from "../../provider/context";
import { IGiftCreateModalProps } from "../../types";
import { useWallet } from "../../../../providers/Wallet";
import {} from "@cosmjs/cosmwasm-stargate";
import { useCreateCard } from "src/api/hooks/cards";

const GiftCreateModal: FC<IGiftCreateModalProps> = (props) => {
  const {} = props;
  const id = useId();
  const [newCard, setNewCard] = useState(DEFAULT_CARD);
  const { close } = useModal();
  const { wallet } = useWallet();

  const { mutateAsync } = useCreateCard();

  const create = async () => {
    if (!wallet) return;
    mutateAsync(newCard)
      .then((res) => {
        console.log("Created");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col w-[40vw]">
      <span className="font-bold text-lg">Create Gift Card</span>
      <div className="grid grid-cols-2 gap-2 mt-6">
        <div className="col-span-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipient</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={newCard.recipient}
              onChange={(e) => {
                const val = e.target.value;
                setNewCard((prev) => ({
                  ...prev,
                  recipient: val,
                }));
              }}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={newCard.message}
              onChange={(e) => {
                const val = e.target.value;
                setNewCard((prev) => ({
                  ...prev,
                  message: val,
                }));
              }}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">USDC Amount</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={newCard.usdc_amount}
              onChange={(e) => {
                const val = e.target.value;
                setNewCard((prev) => ({
                  ...prev,
                  usdc_amount: val,
                }));
              }}
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              value={newCard.theme}
              onChange={(e) => {
                const val = e.target.value as any;
                setNewCard((prev) => ({
                  ...prev,
                  theme: val,
                }));
              }}
              className="select select-bordered"
            >
              <option disabled selected>
                Pick one
              </option>
              {THEMES.map((theme) => (
                <option key={theme} value={theme} className="normal-case">
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-1 flex flex-col items-start justify-end h-full">
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <input
                type="radio"
                name={id}
                className="radio checked:bg-red-500 radio-sm"
                checked={newCard.include === "CW20"}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setNewCard((prev) => ({
                      ...prev,
                      include: "CW20",
                    }));
                  }
                }}
              />
              <span className="label-text">Include CW20</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <input
                type="radio"
                name={id}
                className="radio checked:bg-blue-500 radio-sm"
                checked={newCard.include === "CW721"}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setNewCard((prev) => ({
                      ...prev,
                      include: "CW721",
                    }));
                  }
                }}
              />
              <span className="label-text">Include CW721</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-4">
              <input
                type="radio"
                name={id}
                className="radio checked:bg-blue-500 radio-sm"
                checked={newCard.include === "None"}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setNewCard((prev) => ({
                      ...prev,
                      include: "None",
                    }));
                  }
                }}
              />
              <span className="label-text">None</span>
            </label>
          </div>
        </div>

        <div className="col-span-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                {newCard.include === "None" ? "" : "Contract Address"}
              </span>
            </label>
            {newCard.include === "None" ? (
              ""
            ) : (
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newCard.address}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewCard((prev) => {
                    if (newCard.address === "CW20") {
                      return {
                        ...prev,
                        address: val,
                      };
                    } else {
                      return {
                        ...prev,
                        address: val,
                      };
                    }
                  });
                }}
              />
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                {newCard.include === "CW20"
                  ? "Amount"
                  : newCard.include === "CW721"
                  ? "Token ID"
                  : ""}
              </span>
            </label>
            {newCard.include === "None" ? (
              ""
            ) : (
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={
                  newCard.include === "CW20" ? newCard.amount : newCard.tokenId
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setNewCard((prev) => {
                    if (newCard.include === "CW20") {
                      return {
                        ...prev,
                        amount: val,
                      };
                    } else {
                      return {
                        ...prev,
                        tokenId: val,
                      };
                    }
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 mt-6 w-full justify-end">
        <button onClick={close} className=" btn btn-ghost">
          Cancel
        </button>
        <button onClick={create} className=" btn btn-primary">
          Create for 2 USDC
        </button>
      </div>
    </div>
  );
};
export default GiftCreateModal;
