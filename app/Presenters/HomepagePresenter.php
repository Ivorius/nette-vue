<?php

declare(strict_types=1);

namespace App\Presenters;


final class HomepagePresenter extends BasePresenter
{
	public function renderDefault(): void
	{
		$this->template->handleParameter = $this->getParameterId('cityId');
	}

	public function handleSelect($cityId)
	{
		$this->flashMessage('Vybráno ID: ' . $cityId);
		$this->redrawControl("flashMessages");
	}
}
