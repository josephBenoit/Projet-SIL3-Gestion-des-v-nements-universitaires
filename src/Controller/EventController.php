<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventController extends AbstractController
{
    #[Route('/eventCalendar', name: 'app_eventCalendar')]
    public function eventCalendar(): Response
    {
        return $this->render('event/eventCalendar.html.twig', [
            'controller_name' => 'EventController',
        ]);
    }

    #[Route('/eventDetail', name: 'app_eventDetail')]
    public function eventDetail(): Response
    {
        return $this->render('event/eventDetail.html.twig', [
            'controller_name' => 'EventController',
        ]);
    }
}
