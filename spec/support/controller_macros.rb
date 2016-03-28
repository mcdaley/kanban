module ControllerMacros
  ##
  # Sign in users for controller specs
  #
  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user    = FactoryGirl.create(:user)
      sign_in   user
    end
  end
  
  ##
  # Sign in user for controller specs
  #
  # ==== Attributes
  #
  # * +user+ - User factory to create and sign in. Creates a user
  #            variable, @me that can be used in the rspecs
  #
  def login_my_user(user = :user)
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      @me      = FactoryGirl.create(user)
      sign_in    @me
    end
  end

end # end of module ControllerMacros