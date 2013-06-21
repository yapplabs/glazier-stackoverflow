glazier-card-bootstrap
======================

A starting point for new glazier card repos


## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-card-bootstrap

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # lookup the CardManifest record
    >> cm = CardManifest.where(name: 'raycohen/glazier-card-bootstrap').first

    # create a Pane record
    >> pane = Pane.new
    >> pane.card_manifest_name = cm.name
    >> pane.save

    # add the Pane to the dashboard of your choosing
    >> db = Dashboard.where(repository: 'yapplabs/glazier').first
    >> db.panes.push(pane)
