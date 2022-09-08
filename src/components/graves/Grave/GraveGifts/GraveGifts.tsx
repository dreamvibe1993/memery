import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Textarea,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { TbCandy } from "react-icons/tb";
import { Gifts } from "../../../../types/Grave";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";

export const GraveGifts = (props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;
  const {
    isOpen: isGiftModalOpen,
    onOpen: onGiftModalOpen,
    onClose: onGiftModalClose,
  } = useDisclosure();

  const { updateGraveGifts } = useUpdateGrave();

  const [chosenGiftKey, setChosenGiftKey] = useState<keyof Gifts | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isModalLoading, setModalLoading] = useState(false);

  const chooseGift = (giftKey: keyof Gifts) => {
    console.log(giftKey)
    setChosenGiftKey(giftKey);
  };

  const presentGift = async () => {
    if (!grave) return console.error("No grave to update gifts on!");
    if (!chosenGiftKey) return console.error("No gift was chosen!");
    try {
      setModalLoading(true);
      grave.gifts[chosenGiftKey] = [
        ...grave.gifts[chosenGiftKey],
        {
          by: "anonymous",
          wish: message,
        },
      ];
      await updateGraveGifts(grave);
      await refreshGrave();
      onGiftModalClose();
    } finally {
      setModalLoading(false);
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const giftsSvgDictionary = {
    vodka: <MdLocalDrink />,
    btc: <FaMoneyBillWave />,
    candies: <TbCandy />,
  };

  if (!grave) return null;

  return (
    <>
      <CommonModal
        title="Подарок"
        isOpen={isGiftModalOpen}
        onCancel={onGiftModalClose}
        onConfirm={presentGift}
        isLoading={isModalLoading}
      >
        <Text mb={4}>
          Вы собираетесь оставить 1x {chosenGiftKey} на могилке у{" "}
          {grave.name + ".\n\r"}
          Желаете добавить что-нибудь к подарку?
        </Text>
        <Textarea
          resize="none"
          placeholder="Пожелайте что-нибудь покойнику, или пошлите его нахуй... Максимум 100 символов."
          maxLength={100}
          onChange={handleMessage}
          minHeight="150px"
        />
      </CommonModal>
      <VStack>
        <Box height="440px" width="100%" overflowY="auto" bg="gray.200">
          <Grid
            gap="10px"
            gridTemplateColumns="repeat(3, calc(33% - 10px))"
            gridAutoRows="100px"
            width="100%"
            height="100%"
            justifyContent="space-between"
            p={3}
          >
            {Object.keys(grave.gifts).reduce((acc: JSX.Element[], curr) => {
              acc = [
                ...acc,
                ...grave.gifts[curr as keyof Gifts].map((gift) => (
                  <GridItem
                    bg="white"
                    key={gift._id}
                    shadow="base"
                    as={Center}
                    css={{
                      svg: {
                        width: "80%",
                        height: "80%",
                      },
                    }}
                  >
                    {giftsSvgDictionary[curr as keyof Gifts]}
                  </GridItem>
                )),
              ];
              return acc;
            }, [])}
          </Grid>
        </Box>
        <Flex
          justify={"space-around"}
          width="100%"
          my="1rem !important"
          css={{
            svg: {
              height: "40px",
              width: "40px",
            },
          }}
        >
          <IconButton
            icon={<FaMoneyBillWave />}
            onClick={() => chooseGift("btc")}
            aria-label="Подарить денег"
            p={4}
          />
          <IconButton
            icon={<TbCandy />}
            onClick={() => chooseGift("candies")}
            aria-label="Подарить конфетов"
            p={4}
          />
          <IconButton
            icon={<MdLocalDrink />}
            onClick={() => chooseGift("vodka")}
            aria-label="Оставить чарку водки"
            p={4}
          />
        </Flex>
        <Button onClick={onGiftModalOpen} disabled={!!!chosenGiftKey}>
          Оставить
        </Button>
      </VStack>
    </>
  );
};
