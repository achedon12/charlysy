<?php

namespace App\Trait;

use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

trait TimeStampTrait
{

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\PrePersist]
    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(DateTimeImmutable $date = new DateTimeImmutable()): static
    {
        $this->createdAt = $date;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $date = new DateTimeImmutable()): static
    {
        $this->updatedAt = $date;

        return $this;
    }

    public function __construct()
    {
        parent::__construct();
        $this->createdAt = new DateTimeImmutable();
    }

}