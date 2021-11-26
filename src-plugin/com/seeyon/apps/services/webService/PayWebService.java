package com.seeyon.apps.services.webService;

import com.seeyon.ctp.common.exceptions.BusinessException;


public interface PayWebService {
	public String updateMoney(String dataXml) throws BusinessException;
	
}
