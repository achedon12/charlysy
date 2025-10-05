<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\JWTService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class AuthController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $entityManager,
                                private readonly UserPasswordHasherInterface $passwordHasher,
                                private readonly SerializerInterface $serializer,
                                private readonly ValidatorInterface $validator,
                                private readonly JWTService $jwtService)
    {
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
    ): JsonResponse {
        $data = $request->getPayload()->all();

        $user = new User();
        $user->setFirstname($data['firstname'] ?? '');
        $user->setLastname($data['lastname'] ?? '');
        $user->setEmail($data['email'] ?? '');
        $user->setPseudo($data['pseudo'] ?? '');

        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            $message = implode(", ", array_map(fn($e) => $e->getMessage(), iterator_to_array($errors)));
            return $this->json(['errors' => $message], Response::HTTP_BAD_REQUEST);
        }

        $existingUser = $this->entityManager->getRepository(User::class)->findByEmail($user->getEmail());
        if ($existingUser) {
            return $this->json(['error' => 'Email already exists'], Response::HTTP_CONFLICT);
        }

        $existingPseudo = $this->entityManager->getRepository(User::class)->findByPseudo($user->getPseudo());
        if ($existingPseudo) {
            return $this->json(['error' => 'Pseudo already exists'], Response::HTTP_CONFLICT);
        }

        if (!isset($data['password']) || strlen($data['password']) < 6) {
            return $this->json(['error' => 'Password must be at least 6 characters long'], Response::HTTP_BAD_REQUEST);
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json([
            'message' => 'User created successfully',
            'user' => json_decode($this->serializer->serialize($user, 'json', ['groups' => 'user:read']))
        ], Response::HTTP_CREATED);
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        // The actual login is handled by Symfony Security and JWT bundle
        return $this->json(['message' => 'Login successful']);
    }

    #[Route('/profile', name: 'api_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'user' => json_decode($this->serializer->serialize($user, 'json', ['groups' => 'user:read']))
        ]);
    }

    #[Route('/profile', name: 'api_profile_update', methods: ['PUT'])]
    public function updateProfile(
        Request $request,
    ): JsonResponse {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['firstname'])) {
            $user->setFirstname($data['firstname']);
        }
        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }
        if (isset($data['pseudo'])) {
            $user->setPseudo($data['pseudo']);
        }

        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->flush();

        return $this->json([
            'message' => 'Profile updated successfully',
            'user' => json_decode($this->serializer->serialize($user, 'json', ['groups' => 'user:read']))
        ]);
    }
}