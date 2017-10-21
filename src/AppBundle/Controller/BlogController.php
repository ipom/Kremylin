<?php
/**
 * Created by PhpStorm.
 * User: Mathys healthy
 * Date: 10/21/2017
 * Time: 6:14 PM
 */

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Helper\ConstantHelper;
use AppBundle\Entity\Article;
use AppBundle\Form\ArticleType;

class BlogController extends Controller
{
    /**
     * @Route("/blog", name="blog")
     */
    public function indexAction(Request $request){
        $articles = $this->getDoctrine()->getRepository(ConstantHelper::REPO_ARTICLE)->findAll();
        return $this->render('blog/index.html.twig',[
            'articles' => $articles
        ]);
    }

    /**
     * @Route("/blog/add", name="add-article")
     */
    public function addAction(Request $request){
        $article = new Article();
        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $article = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();

            return $this->redirectToRoute('blog');
        }

        return $this->render('blog/add.html.twig',[
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/blog/show/{article}", name="show-article")
     */
    public function showAction(Request $request, Article $article){
        return $this->render('blog/show.html.twig',[
            'article' => $article
        ]);
    }
}