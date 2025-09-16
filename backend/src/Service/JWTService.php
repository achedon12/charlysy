<?php

namespace App\Service;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTService
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager
    ) {}

    public function generateToken(UserInterface $user): string
    {
        return $this->jwtManager->create($user);
    }

    public function getPayload(string $token): array
    {
        $parts = explode('.', $token);
        return json_decode(base64_decode($parts[1]), true);
    }

    public function getExpirationTime(string $token): int
    {
        $payload = $this->getPayload($token);
        return $payload['exp'];
    }
}