import React from 'react';
import { Box, Image, Stack, Heading, Text, Divider, Flex } from '@chakra-ui/react';

interface CardProps {
    Name: string;
    sys: string
    weather: string
    min: string
    max: string
    wind: string
    icon: string
}

const Card: React.FC<CardProps> = ({ Name, sys, weather, min, max, wind, icon }) => {
    return (
        <Box
            className="bg-blue-100 rounded-lg shadow-lg p-6 mt-6"
            maxW="sm"
            textAlign="center"
            height="450px"
            width="500px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            overflow="hidden"
        >
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="Weather Icon"
                    borderRadius="full"
                    objectFit="cover"
                    height="100px"
                    width="100px"
                    className="mb-4"
                />

                <Stack mt="6" spacing="3" align="center">
                    <Heading size="lg" className="text-blue-600">
                        {Name}, {sys}
                    </Heading>
                    <Text className="text-gray-600">

                        <b>
                            Weather:
                        </b>    {weather}
                    </Text>
                    <Text className="text-gray-600">
                        <b>
                            Max Temp:
                        </b>
                        {" "} {max}°C
                    </Text>
                    <Text className="text-gray-600">
                        <b>
                            Min Temp:
                        </b>
                        {" "} {min}°C
                    </Text>
                    <Text className="text-gray-600">
                        <b>
                            Wind Speed:
                        </b>

                        {""} {wind} km/h
                    </Text>
                </Stack>
            </Flex>

            <Divider mt="4" />

            <Flex mt="4" justifyContent="space-between" width="100%">
                <Text fontSize="sm" className="text-gray-500">
                    Humidity: 70%
                </Text>
                <Text fontSize="sm" className="text-gray-500">
                    Visibility: 10 km
                </Text>
            </Flex>
        </Box>
    );
};

export default Card;
