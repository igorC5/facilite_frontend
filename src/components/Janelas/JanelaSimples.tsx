import { useColors } from "@/styles/cores";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { Minus, Square, X } from "lucide-react";
import { useState } from "react";
import { Rnd } from "react-rnd";

export interface IJanelaSimples {
  janelaInfo: { 
    id: number; 
    minimizada: boolean; 
    zIndex: number
  };
  open: boolean;
  fecharJanela: any;
  minimiza?: any;
  minimizada?: boolean;
  zIndexJanela: number;
  setZIndexJanela: any;
}

export default function JanelaSimples({
  janelaInfo,
  open, 
  fecharJanela,
  minimiza,
  minimizada,
  zIndexJanela,
  setZIndexJanela,
}: IJanelaSimples) {
  if (!open) return null;

  const Colors = useColors();

  const [size, setSize] = useState({ width: '50%', height: '50%' });
  const [position, setPosition] = useState({ x: 500, y: 100 });

  const minimizar = () => {
    minimiza();
  }

  const maximizar = () => {
    setPosition({ x: 0, y: 0 })
    setSize({ width: '100%', height: '100%' })
  }
  
  const diminuir = () => {
    setPosition({ x: 500, y: 100 })
    setSize({ width: '50%', height: '50%' })
  }

  const mudarTamanho = () => {
    const estaMaximizado =
      position.x === 0 &&
      position.y === 0 &&
      size.width === '100%' &&
      size.height === '100%';

    if (estaMaximizado) {
      diminuir();
    } else {
      maximizar();
    }
  }

  return (
    <Flex 
      onClick={() => {
        setZIndexJanela(janelaInfo.id)
      }}
      zIndex={minimizada ? -5 : zIndexJanela}
      w="100vw"
      h="90vh" 
      position="absolute" 
      top="0" 
      overflow="hidden" 
      pointerEvents="none"
    >
      <Rnd
        minWidth={500}
        minHeight={300}
        bounds="parent"
        size={size}
        position={position}
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, pos) => {
          setSize({
            width: ref.style.width,
            height: ref.style.height,
          });
          setPosition(pos);
        }}

        // default={{
        //   x: "500",
        //   y: 100,
        //   width: '50%',
        //   height: '50%',
        // }}
        style={{ pointerEvents: 'auto' }}
        // cancel=".conteudo"
      >
        <Flex 
          w="100%"
          h="100%"
          bg={Colors.bg} 
          borderWidth="4px"
          borderColor={Colors.borderColor} 
          flexDir="column"
        >
          <Flex flexDir="row" h="30px" bg={Colors.borderColor}>
            <Text>{janelaInfo.texto}</Text>
            <Spacer />
            <Button 
              h="30px"
              px="0"
              rounded="0" 
              bg="none" 
              color={Colors.textColor}
              _hover={{
                bg: 'rgba(0,0,0, 0.2)'
              }}
              onClick={() => {
                minimizar()
              }}
            >
              <Minus />
            </Button>
            <Button 
              h="30px"
              px="0"
              rounded="0" 
              bg="none" 
              color={Colors.textColor}
              _hover={{
                bg: 'rgba(0,0,0, 0.2)'
              }}
              onClick={() => mudarTamanho()}
            >
              <Square/>
            </Button>
            <Button 
              h="30px"
              px="0"
              rounded="0" 
              bg="none" 
              color={Colors.textColor}
              _hover={{
                bg: 'tomato'
              }}
              onClick={
                () => {
                  fecharJanela(janelaInfo.id)
                }
              }
            >
              <X />
            </Button>
          </Flex>
          <Flex className="conteudo" bg="white" flex="1" cursor="default">
            <Text>teste</Text>
            <Button>
              e
            </Button>
          </Flex>
        </Flex>
      </Rnd>
    </Flex>
  )
}
